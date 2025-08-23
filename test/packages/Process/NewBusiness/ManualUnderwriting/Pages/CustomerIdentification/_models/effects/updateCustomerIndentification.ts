import lodash from 'lodash';
import { produce } from 'immer';
import { NAMESPACE } from '../../activity.config';

export default function* updateCustomerIndentification({ payload }: any, { put, select }: any) {
  const businessData = lodash.get(payload, 'businessData');
  const claimProcessData = yield select((state) => state?.[NAMESPACE]?.claimProcessData);
  if (!lodash.isEmpty(businessData)) {
    const dedupCheckClientIds = lodash
      .chain(claimProcessData)
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
      type: 'saveClaimProcessData',
      payload: {
        claimProcessData: result,
      },
    });
  }
}
