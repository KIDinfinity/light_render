import lodash from 'lodash';
import { Modal } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import { getPolicyInfoByPolicyNo } from '@/services/posControllerService';

export default function* ({ payload }: any, { select, call, put }: any) {
  const { policyNo, transactionType, claimProcessData, posNo } = yield select((state: any) => ({
    policyNo:
      state.phowbDataCaptureController.claimProcessData.posDataDetail?.posRequestInformation
        ?.policyNo,
    transactionType:
      state.phowbDataCaptureController.claimProcessData.posDataDetail?.posRequestInformation
        ?.transactionType,
    claimProcessData: state.phowbDataCaptureController.claimProcessData,
    submissionChannel: state.processTask.getTask?.submissionChannel,
    posNo: state.processTask?.getTask?.inquiryBusinessNo,
  }));

  let params = {
    policyNo: formUtils.queryValue(payload?.policyNo || policyNo),
    transactionType: formUtils.queryValue(payload?.transactionType || transactionType),
  };
  if (posNo) {
    params = {
      ...params,
      posNo,
    };
  }
  if (!params?.policyNo && !params?.transactionType) return;

  const response = yield call(getPolicyInfoByPolicyNo, params);

  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    yield put({
      type: 'saveClaimProcessData',
      payload: {
        claimProcessData: {
          // ...claimProcessData,
          submissionChannel: claimProcessData?.submissionChannel,
          posDataDetail: {
            ...response.resultData,
            posRequestInformation: {
              ...response?.resultData?.posRequestInformation,
              ...params,
            },
          },
        },
        init: true,
      },
    });
    yield put({
      type: 'saveSnapshot',
    });
  } else if (
    !response.success &&
    lodash.isArray(response.promptMessages) &&
    response.promptMessages.length > 0
  ) {
    Modal.error({
      content: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000060' }, params?.policyNo),
      okText: formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.receivedModalCancel' }),
    });
    yield put({
      type: 'cleanSubmitParam',
      payload: {
        ...params,
      },
    });
  }
}
