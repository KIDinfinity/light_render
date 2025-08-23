import lodash from 'lodash';
import { requestLifeJRefundInfo } from '@/services/claimJpLifejBoControllerService';

export default function* getLifeJRefundInfo({ payload }: any, { call, put }: any) {
  const { policyNo, incidentId, businessData, id } = payload;
  const response = yield call(requestLifeJRefundInfo, { businessData, policyNo, incidentId });
  if (response && response.success && lodash.isPlainObject(response?.resultData)) {
    const { lifeJClaimId, ...lifeJRefundInfo } = response?.resultData || {};
    yield put({
      type: 'saveLifeJRefundInfo',
      payload: {
        id: id,
        incidentId: incidentId,
        ...lifeJRefundInfo,
      },
    });
  }
}
