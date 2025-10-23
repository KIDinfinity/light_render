import lodash from 'lodash';

import { requestAgentInfoForUI } from '@/services/c360BenefitPlanPatchControllerService';
import { tenant } from '@/components/Tenant';
import { handleMessageModal } from '@/utils/commonMessage';
import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from '../../activity.config';

export default function* saveSearchAgentCode(
  { payload = {} }: any,
  { put, call, select }: any
): Generator<any, void, any> {
  const { agentCode } = payload;
  if (!agentCode) {
    return;
  }

  const businessNo = yield select((state: any) => state.processTask?.getTask?.businessNo);
  const companyCode = yield select((state: any) => state.processTask?.getTask?.companyCode) || '2';
  const policyNo = yield select(
    (state: any) => state[NAMESPACE].processData?.policyNoInfo?.policyNo
  );
  const salesChannel = yield select(
    (state: any) => state[NAMESPACE].processData?.agentInfo?.salesChannel
  );
  const regionCode = tenant.region();

  const response = yield call(requestAgentInfoForUI, {
    businessNo,
    regionCode,
    companyCode,
    agentInfos: [
      {
        agentCode: agentCode,
        agentType: 'P',
      },
    ],
  });

  if (response?.success && response?.resultData) {
    const agent = response.resultData?.[0]?.agent || {};
    const { channelCode, agentName, subChannelCode } = lodash.pick(agent, [
      'channelCode',
      'agentName',
      'subChannelCode',
    ]);

    if (policyNo && channelCode !== formUtils.queryValue(salesChannel)) {
      handleMessageModal([{ content: 'MSG_001358' }]);
    } else {
      yield put({
        type: 'saveAgentInfo',
        payload: {
          changedFields: {
            agentName,
            subChannel: subChannelCode,
            salesChannel: channelCode,
          },
        },
      });

      yield put({
        type: 'getProductList',
        payload : {
          subChannel : subChannelCode
        }
      });

      return;
    }
  }

  yield put({
    type: 'saveAgentInfo',
    payload: {
      changedFields: {
        agentCode: '',
        agentName: '',
        subChannel: '',
      },
    },
  });
}
