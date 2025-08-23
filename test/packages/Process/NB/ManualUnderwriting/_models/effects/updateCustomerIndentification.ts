import lodash from 'lodash';
import { produce }  from 'immer';

export default function* updateCustomerIndentification({ payload }: any, { put, select }: any) {
  const businessData = lodash.get(payload, 'businessData');
  const customerIndentificationData = yield select(
    (state) => state?.manualUnderwriting?.customerIndentificationData
  );
  if (!lodash.isEmpty(businessData)) {
    const dedupCheckClientIds = lodash
      .chain(customerIndentificationData)
      .get('policyList[0].clientInfoList', [])
      .map((item) => item.id)
      .value();
    const result = produce(businessData, (draftState: any) => {
      const policyList = lodash
        .chain(businessData)
        .get('policyList', [])
        .map((policy) => {
          const clientInfoList = lodash.get(policy, 'clientInfoList', []);
          const filterDedupCheckClient = lodash.filter(clientInfoList, (client) => {
            return dedupCheckClientIds.includes(client.id);
          });
          return {
            ...policy,
            clientInfoList: filterDedupCheckClient,
          };
        })
        .value();
      lodash.set(draftState, 'policyList', policyList);
    });
    yield put({
      type: 'saveCustomerIndentificationData',
      payload: {
        customerIndentificationData: result,
      },
    });
  }
}
