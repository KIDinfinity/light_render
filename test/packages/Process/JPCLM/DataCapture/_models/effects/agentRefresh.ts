import lodash from 'lodash';
import claimRefreshPolicyAgentControllerV2Service from '@/services/claimRefreshPolicyAgentControllerV2Service';
import { formUtils } from 'basic/components/Form';
import { serialize as objectToFormData } from 'object-to-formdata';
import {v4 as uuidv4 } from 'uuid';
import { tenant } from '@/components/Tenant';
import { validateFieldRequire } from 'claim/pages/validators/utils';

const FIELDNAME = 'agentNumber';

export default function* agentRefresh(_: any, { call, put, select }: any) {
  const { policyAgent, taskDetail } = yield select((state: any) => ({
    policyAgent: state.JPCLMOfDataCapture.claimProcessData.policyAgent,
    taskDetail: state.processTask.getTask,
  }));
  yield put({
    type: 'saveRefreshStatus',
    payload: { checkNumberRefresh: true },
  });
  const businessNo = lodash.get(taskDetail, 'businessNo');
  const agentNumber = formUtils.queryValue(policyAgent?.agentNumber);

  if (!agentNumber) {
    const agentNumberObj = validateFieldRequire(FIELDNAME);
    yield put({
      type: 'serviceAgentUpdate',
      payload: { changedFields: { agentNumber: agentNumberObj } },
    });
    return;
  }

  const params = {
    claimNo: businessNo || '',
    agentNumber,
    regionCode: tenant.remoteRegion(),
  };
  const response = yield call(
    claimRefreshPolicyAgentControllerV2Service.refreshAgentV2,
    objectToFormData(params)
  );

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  const { agentIdCard, agentEmail, agentName, agentSurName } = lodash.pick(
    resultData,
    ['agentIdCard', 'agentEmail', 'agentName', 'agentSurName']
  );
  if (success && resultData) {
    if (!businessNo) {
      yield put({
        type: 'savePolicyAgent',
        payload: {
          policyAgent: {
            ...resultData,
            givenName: agentName,
            surname: agentSurName,
            id: uuidv4(),
            email: agentEmail,
            agentIdNo: agentIdCard,
          },
        },
      });
      yield put({
        type: 'getAgentNoList',
        payload: {
          claimNo: businessNo,
        },
      });
    } else {
      yield put({
        type: 'getPolicyAgentInfo',
        payload: {
          agentNumber,
          businessNo,
        },
      });
    }
  }
}
