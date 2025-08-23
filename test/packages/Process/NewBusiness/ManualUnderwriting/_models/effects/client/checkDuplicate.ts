import lodash from 'lodash';

import { getSubmitData } from '@/utils/modelUtils/nbUtils';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
import { clientCheckDuplicate } from '@/services/owbNbProposalControllerService';
import { EOptionType } from 'basic/enum/EOptionType';
import { saveSnashot } from 'basic/utils/SnapshotTool';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { NbClientTag } from 'process/NewBusiness/ManualUnderwriting/Pages/CustomerIdentification/Enum';
import { OptionType } from 'process/NewBusiness/ManualUnderwriting/_enum';

import getTouch from '../DataHandle/getTouch';
import { CustomerIdentificationModalVisibleOptions } from 'process/NewBusiness/ManualUnderwriting/Pages/CustomerIdentification';

const packageSubmitData = ({ dataForSubmit, taskDetail, filterClientId, operationType }: any) => {
  const tempDataForSubmit = lodash.cloneDeep(dataForSubmit);
  if (filterClientId) {
    lodash.set(
      tempDataForSubmit,
      'policyList[0].clientInfoList',
      lodash.filter(
        tempDataForSubmit?.policyList?.[0]?.clientInfoList,
        (item) => item.id === filterClientId
      )
    );
  }
  return getSubmitData({
    taskDetail,
    dataForSubmit: { businessData: tempDataForSubmit },
    operationType,
  });
};

const matchDedupCheck = (resultData: any) => {
  const dedupCheck = [
    NbClientTag.ProbableMatch,
    NbClientTag.FullyMatch,
    NbClientTag.Mismatch,
    NbClientTag.NotEnoughKeyInfo,
  ];
  return lodash.includes(
    dedupCheck,
    lodash.get(resultData, 'policyList[0].clientInfoList[0].dedupCheckResult', '')
  );
};

export default function* ({ payload }: any, { call, put, select }: any) {
  yield put({
    type: `login/saveLoadingStatus`,
    payload: { loadingStatus: true },
  });
  const clientId = payload?.clientId;
  const modalData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData
  ) || {};
  const processData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  ) || {};
  const entities = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities);
  const dataForSubmit: any = yield put.resolve({
    type: 'getFEToBE',
    payload: {
      processData: { ...processData, ...modalData.processData },
      entities: { ...entities, ...modalData.entities },
    },
  });
  const taskDetail = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail
  );
  const checkDuplicateParams = packageSubmitData({
    dataForSubmit,
    taskDetail,
    filterClientId: clientId,
    operationType: OptionType.updateClient,
  });
  const response = yield call(clientCheckDuplicate, { ...checkDuplicateParams });

  if (response?.success && response?.resultData) {
    const resultData = response?.resultData;
    yield put({
      type: `customerIdentification/saveClaimProcessData`,
      payload: {
        claimProcessData: { ...(resultData || {}) },
      },
    });

    const isBreak = matchDedupCheck(resultData);
    if (isBreak) {
      yield put({
        type: `customerIdentification/setCheckDuplicating`,
        payload: {
          checkDuplicating: clientId,
        },
      });
      yield put({
        type: `customerIdentification/saveShow`,
        payload: {
          show: CustomerIdentificationModalVisibleOptions.Visible,
        },
      });
    } else {
      const updateClientParams = packageSubmitData({
        dataForSubmit,
        taskDetail,
        operationType: 'updateClient',
      });
      const touchResponse = yield getTouch({ params: updateClientParams });
      if (touchResponse?.success) {
        yield saveSnashot({
          taskDetail,
          dataForSubmit: touchResponse?.resultData?.businessData,
          optionType: EOptionType.proposalChange,
        });
        yield put({
          type: 'getBEToFE',
          payload: {
            businessData: touchResponse?.resultData?.businessData,
          },
        });
      } else {
        handleErrorMessageIgnoreXErrorNotice(touchResponse);
      }
    }
  }

  if (!response?.success) {
    handleErrorMessageIgnoreXErrorNotice(response);
  }

  yield put({
    type: `login/saveLoadingStatus`,
    payload: { loadingStatus: false },
  });
}
