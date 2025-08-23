import { Modal } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import {
  asyncRequestSrvSimplePolicy,
  getAsyncRequestSrvSimplePolicyResult,
} from '@/services/posControllerService';
import moment from 'moment';
const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

export default function* ({ payload }: any, { select, call, put }: any) {
  const { defaultPolicyId, claimProcessData } = yield select((state: any) => ({
    defaultPolicyId:
      state.GeneralPOSPHNotCFTController.claimProcessData.businessData?.transactionTypes?.[0]
        ?.posRequestInformation?.policyId,
    claimProcessData: state.GeneralPOSPHNotCFTController.claimProcessData,
  }));
  // const response = yield call(getPolicyInfoByPolicyNo, params);
  // if(payload.transactionType) {
  //   yield put({
  //       type: 'updateTransactionTypes',
  //       payload: {
  //         transactionType: payload.transactionType
  //       },
  //     });
  //   return;
  // }
  const policyId = formUtils.queryValue(payload?.policyId || defaultPolicyId);
  const skipRequest = payload?.skipRequest;
  let srvData = claimProcessData?.businessData?.policyInfo;

  let asyncResponse;
  if (!skipRequest) {
    if (!policyId) return;
    const { resultData } = yield call(asyncRequestSrvSimplePolicy, { policyId });
    const startTimer = moment();
    while (true) {
      asyncResponse = yield call(getAsyncRequestSrvSimplePolicyResult, {
        asyncId: resultData,
        policyId,
      });
      if (
        !asyncResponse ||
        !asyncResponse.success ||
        asyncResponse.resultData.status !== 'inProgress'
      ) {
        break;
      }
      if (moment().diff(startTimer, 'second') > 42) {
        Modal.error({
          content: formatMessageApi({ Label_COM_Message: 'MSG_000898' }),
          okText: formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.receivedModalCancel' }),
        });
        break;
      }
      yield call(delay, 5000);
    }
    srvData = asyncResponse.resultData.srvPolicyVO;
  }

  if (asyncResponse?.resultData?.status === 'finish' || skipRequest) {
    const ownerData = srvData.policyClientRoleList?.find((client) => {
      return client.policyId === policyId && client.customerRole === 'CUS002';
    });
    const fullOwnerData =
      srvData.clientInfoList?.find(
        (client) => ownerData && client.clientId === ownerData.clientId
      ) || {};
    const insuredData = srvData.policyClientRoleList?.find((client) => {
      return client.policyId === policyId && client.customerRole === 'CUS001';
    });
    const fullInsuredData =
      srvData.clientInfoList?.find(
        (client) => insuredData && client.clientId === insuredData.clientId
      ) || {};

    // Object.assign(clientData, fullClientData);
    const policyInfo = (srvData.applyToPolicyInfoList || [])
      .concat(srvData.policyInfoList || [])
      ?.find((policyInfo) => policyInfo.policyId === policyId);
    const agentData = srvData.policyAgentList?.find((agent) => agent.policyId === policyId);
    const agentName = [agentData?.firstName, agentData?.middleName, agentData?.surname]
      .filter((name) => name)
      .join(' ');
    const { claimProcessData: latestProcessData } = yield select((state: any) => ({
      claimProcessData: state.GeneralPOSPHNotCFTController.claimProcessData,
    }));
    yield put({
      type: 'saveClaimProcessData',
      payload: {
        claimProcessData: {
          businessData: {
            ...latestProcessData.businessData,
            policyOwnerInformation: fullOwnerData,
            insuredInformation: fullInsuredData,
            mainPolicyId: policyId,
            policyInfo: {
              ...claimProcessData?.businessData?.policyInfo,
              ...srvData,
            },
            posRequestInformation: {
              ...policyInfo,
              policyId,
              agentName,
              agentPhone: agentData?.agentPhone,
            },
          },
        },
        init: true,
      },
    });
    put({
      type: 'saveSnapshot',
    });
  }
  // else if (
  //   !asyncResponse.success &&
  //   lodash.isArray(asyncResponse.promptMessages) &&
  //   asyncResponse.promptMessages.length > 0
  // ) {

  // yield put({
  //   type: 'cleanSubmitParam',
  //   payload: {
  //     ...params,
  //   },
  // });
  // }
}
