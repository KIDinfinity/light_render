import lodash from 'lodash';
import { getRuleResultByCaseNo } from '@/services/caseMgntProcessRpcRelationshipService';
export default function* (_: any, { put, call, select }: any) {
  const caseNo = yield select((state: any) => state?.workspaceCases?.infoData?.processInstanceId);
  const response = yield call(getRuleResultByCaseNo, { caseNo: caseNo });
  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    const ruleResultList = lodash.get(response, 'resultData') || [];
    yield put({
      type: 'saveRuleResultList',
      payload: {
        ruleResultList: ruleResultList,
      },
    });
  }
  return response;
}
