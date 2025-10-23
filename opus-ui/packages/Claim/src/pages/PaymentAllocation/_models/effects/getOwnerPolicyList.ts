import { tenant } from '@/components/Tenant';
import { requestRedepositPolicyInfo } from '@/services/c360PolicyInfoControllerV2Service';
import lodash from 'lodash';

export default function* getOwnerPolicyList({ payload }: any, { call, select, put }: any) {
  const { claimData } = payload;

  const { taskNotEditable } = yield select(
    ({ claimEditable }: any) => claimEditable.taskNotEditable
  );
  const { ownerPolicyMap } = yield select(
    ({ paymentAllocation }: any) => paymentAllocation.ownerPolicyMap
  );
  if (taskNotEditable) return [];
  // cache payee client's ownerPolicyList
  const cacheKeys = lodash.keys(ownerPolicyMap);
  const clientIds = lodash
    .chain(claimData.payeeList)
    .map((payee) => payee.clientId)
    .filter((clientId) => !cacheKeys.includes(clientId) && clientId)
    .compact()
    .uniq()
    .value();

  if (clientIds.length <= 0) return [];
  const regionCode = tenant.region();
  for (const clientId of clientIds) {
    const param = { clientId, regionCode };

    // @ts-ignore
    const response = yield call(requestRedepositPolicyInfo, param);
    const { success, resultData } = lodash.pick<{
      success: boolean;
      resultData: {
        policyCurrency: string;
        policyId: string;
      }[];
    }>(response, ['success', 'resultData']);

    if (success && resultData) {
      const legalResult = lodash
        .sortedUniqBy(resultData, 'policyId')
        .filter((item) => item?.policyId && item?.policyCurrency);
      yield put({
        type: 'saveOwnerPolicyList',
        payload: {
          policyList: legalResult,
          clientId,
        },
      });
    }
  }
  yield put({
    type: 'getRedepositExchangeRateList',
  });
  return [];
}
