import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

import claimRefreshPolicyAgentControllerService from '@/services/claimRefreshPolicyAgentControllerService';
import { formUtils } from 'basic/components/Form';
import { serialize as objectToFormData } from 'object-to-formdata';
import {v4 as uuidv4 } from 'uuid';
import handleMessageModal from '@/utils/commonMessage';
import { validateFieldRequire } from 'claim/pages/validators/utils';

const FIELDNAME = 'agentNumber';

export default function* agentRefresh(_: any, { call, put, select }: any) {
  const policyAgent = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData.policyAgent
  );
  const taskDetail = yield select(({ processTask }: any) => processTask?.getTask);

  yield put({
    type: 'saveRefreshStatus',
    payload: { checkNumberRefresh: true },
  });
  const businessNo = lodash.get(taskDetail, 'businessNo');
  const agentNumber = formUtils.queryValue(policyAgent?.agentNumber);

  if (!agentNumber) {
    const agentNumberObj = validateFieldRequire(FIELDNAME);
    yield put({
      type: 'savePolicyAgentInfo',
      payload: { changedFields: { agentNumber: agentNumberObj } },
    });
    return;
  }

  const params = {
    claimNo: businessNo || '',
    agentNumber,
  };
  const response = yield call(
    claimRefreshPolicyAgentControllerService.agentRefresh,
    objectToFormData(params)
  );

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  const { agentIdCard, agentEmail, agentName, agentSurName } = lodash.pick(
    resultData?.responseData,
    ['agentIdCard', 'agentEmail', 'agentName', 'agentSurName']
  );
  if (!success && resultData?.integrationCode) {
    handleMessageModal(response?.promptMessages);
  }

  if (success && resultData) {
    yield put({
      type: 'saveIntegrationError',
      payload: {
        promptMessages: '',
      },
    });

    if (!businessNo) {
      yield put({
        type: 'savePolicyAgent',
        payload: {
          policyAgent: {
            ...resultData?.responseData,
            givenName: agentName,
            surname: agentSurName,
            id: uuidv4(),
            email: agentEmail,
            agentIdNo: agentIdCard,
            agentName: `${agentSurName || ''} ${agentName || ''}`,
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
