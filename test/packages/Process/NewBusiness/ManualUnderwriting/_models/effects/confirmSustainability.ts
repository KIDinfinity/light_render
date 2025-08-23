import lodash from 'lodash';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EOptionType } from 'basic/enum/EOptionType';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
import { denormalizeClaimData } from 'process/NewBusiness/ManualUnderwriting/_utils/normalizrUtils';
import { formUtils } from 'basic/components/Form';
import { Action } from '@/components/AuditLog/Enum';

export default function* (_: any, { select, put }: any): Generator<any, any, any> {
  yield put({
    type: 'login/saveLoadingStatus',
    payload: {
      loadingStatus: true,
    },
  });

  const validateResult = yield put.resolve({
    type: `${NAMESPACE}/validateSustainability`,
    payload: {
      type: 'modal'
    }
  });

  if (!validateResult) {
    yield put({
      type: 'login/saveLoadingStatus',
      payload: {
        loadingStatus: false,
      },
    });
    return ;
  }

  const processData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  ) || {};
  const entities = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities);
  const modalData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData
  ) || {};
  const sustainabilityModal = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.sustainabilityModal
  );
  const {
    converageListApplied: coverageList,
    sustainabilityOptions,
    possibleSusOptIdAndNameList,
    customizeSusOptIdList,
  } = lodash.pick(sustainabilityModal, [
    'converageListApplied',
    'sustainabilityOptions',
    'possibleSusOptIdAndNameList',
    'customizeSusOptIdList',
  ]);
  const taskDetail = yield select(({ processTask }: any) => processTask.getTask) || {};
  const denormalizedData = denormalizeClaimData(
    { ...processData, ...modalData.processData, ...sustainabilityModal },
    { ...entities, ...modalData.entities }
  );

  const businessData: any = yield put.resolve({
    type: 'getFEToBE',
    payload: {
      processData: {
        ...processData,
        coverageList,
        sustainabilityOptions,
        possibleSusOptIdAndNameList,
        customizeSusOptIdList,
      },
      entities,
    },
  });

  const response = yield put.resolve({
    type: 'getTouchResult',
    payload: {
      businessData,
      type: EOptionType.sustainabilityConfirm,
    },
  });

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success) {
    yield put({
      type: 'getBEToFE',
      payload: {
        businessData: resultData?.businessData,
      },
    });
    yield put({
      type: 'saveProposalFlags',
      payload: {
        ...lodash.pick(resultData?.businessData, [
          'needPremRecal',
          'newSiRequired',
          'needResendCol',
        ]),
      },
    });
    yield put({
      type: 'auditLogController/logButton',
      payload: {
        action: Action.Save,
        caseNo: taskDetail?.processInstanceId,
        activityKey: formatMessageApi({ Label_BPM_Button: 'Sustainability Options' }),
        buttonCode: 'save',
        isAuto: false,
        newProcessData: formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData)),
      },
    });
    yield put({
      type: 'claimCaseController/saveSnapshot',
      payload: {
        postData: resultData?.businessData,
      },
    });
  } else {
    handleErrorMessageIgnoreXErrorNotice(response);
  }

  yield put({
    type: 'login/saveLoadingStatus',
    payload: {
      loadingStatus: false,
    },
  });

  yield put({
    type: 'setSustainabilityModalVisible',
    payload: {
      visible: false,
    },
  });
}
