import lodash from 'lodash';
import { notification } from 'antd';
import { retrieveSIDoc, retrieveSIToken } from '@/services/owbNbProposalControllerService';
import { getSubmitData } from '@/utils/modelUtils/nbUtils';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
import delay from '@/utils/delay';
import GenerateSIStatus from 'process/NB/ManualUnderwriting/Enum/GenerateSIStatus';
import { getDefaultValueByCode } from '@/services/owbNbCfgControllerService';
import bpm from 'bpm/pages/OWBEntrance';
import addUpdateDate from '@/utils/addUpdateDate';

export default function* (_: any, { call, put, select }: any) {
  yield put({
    type: 'changeGenerateSIStatus',
    payload: {
      generateSIStatus: GenerateSIStatus.Loading,
    },
  });
  const data = yield put.resolve({
    type: 'getDataForSubmit',
  });
  const taskDetail = yield select(({ processTask }: any) => processTask.getTask);
  const dataForSubmit = getSubmitData({
    taskDetail,
    dataForSubmit: data,
    operationType: 'generateSI',
  });
  const generateTokenRes = yield call(retrieveSIToken, dataForSubmit);
  let retryTime = 0;
  const recieveDoc = function* () {
    const retryCountLimit = yield (function* () {
      const response = yield call(getDefaultValueByCode, {
        codeType: 'generateSIRetryCountLimit',
      });
      const result = lodash.get(response, 'resultData');
      if (/[0-9]*/.test(result)) {
        return lodash.toNumber(result);
      }
      return 3;
    })();
    const retryInterval = yield (function* () {
      const defaultValue = 1000 * 10;
      const response = yield call(getDefaultValueByCode, {
        codeType: 'generateSIRetryInteval',
      });
      const result = lodash.get(response, 'resultData');
      if (/[0-9]*/.test(result)) {
        return lodash.toNumber(result);
      }
      return defaultValue;
    })();
    yield delay(retryInterval);
    const response = yield call(retrieveSIDoc, dataForSubmit);
    const { success } = lodash.pick(response, ['success', 'resultData']);
    if (success) {
      yield addUpdateDate(lodash.get(response, 'resultData.caseNo'));
      notification.success({
        message: 'Generate SI Successfully!',
      });
      yield put({
        type: 'changeGenerateSIStatus',
        payload: {
          generateSIStatus: GenerateSIStatus.Completed,
        },
      });
      bpm.buttonAction('save');
    } else {
      if (retryTime < retryCountLimit) {
        retryTime = retryTime + 1;
        yield recieveDoc();
      } else {
        handleErrorMessageIgnoreXErrorNotice(response);
        yield put({
          type: 'changeGenerateSIStatus',
          payload: {
            generateSIStatus: GenerateSIStatus.PermiumChanged,
          },
        });
      }
    }
  };
  if (generateTokenRes?.success) {
    yield put({
      type: 'changeGenerateSIStatus',
      payload: {
        generateSIStatus: GenerateSIStatus.InProgress,
      },
    });
    yield recieveDoc();
  } else {
    yield put({
      type: 'changeGenerateSIStatus',
      payload: {
        generateSIStatus: GenerateSIStatus.PermiumChanged,
      },
    });
    handleErrorMessageIgnoreXErrorNotice(generateTokenRes);
  }
}
