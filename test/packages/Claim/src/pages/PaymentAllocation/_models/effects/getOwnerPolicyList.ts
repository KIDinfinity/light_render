import { tenant } from '@/components/Tenant';
import { requestRedepositPolicyInfo } from '@/services/c360PolicyInfoControllerV2Service';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export default function* getOwnerPolicyList({ payload }: any, { call, select, put }: any) {
  const payloadClaimData = payload?.claimData;
  const allocationClaimData = yield select(
    ({ paymentAllocation }: any) => paymentAllocation.claimData
  );
  const claimData = payloadClaimData || allocationClaimData;

  const taskNotEditable = yield select(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const ownerPolicyMap = yield select(
    ({ paymentAllocation }: any) => paymentAllocation.ownerPolicyMap
  );

  if (taskNotEditable) return [];
  // cache payee client's ownerPolicyList
  const cacheKeys = lodash.keys(ownerPolicyMap);
  const clientIds = lodash
    .chain(claimData?.payeeList)
    .filter(
      (payee) =>
        formUtils.queryValue(payee?.paymentMethod) === 'CHQM' &&
        formUtils.queryValue(payee?.subPaymentMethod) === 'RTPX'
    ) // only specific method show redeposit section
    .map((payee) => formUtils.queryValue(payee.clientId))
    .filter((clientId) => !cacheKeys.includes(clientId) && clientId)
    .compact()
    .uniq()
    .value();

  if (clientIds.length <= 0) return [];
  const regionCode = tenant.region();
  const claimNo = lodash.get(claimData, 'claimNo');
  for (const clientId of clientIds) {
    const param = { clientId, regionCode, businessNo: claimNo };

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
