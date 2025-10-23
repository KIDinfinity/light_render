import lodash from 'lodash';
import { requestLifeJClaimId } from '@/services/claimJpLifejBoControllerService';

export default function* getLifeJClaimId({ payload }: any, { call, put }: any) {
  const { policyNo, incidentId, businessData, id } = payload;
  const response = yield call(requestLifeJClaimId, { businessData, policyNo, incidentId });
  if (response && response.success && lodash.isPlainObject(response?.resultData)) {
    const { lifeJClaimId, ...lifeJRefundInfo } = response?.resultData || {};
    yield put({
      type: 'saveLifeJClaimId',
      payload: {
        id: id,
        incidentId: incidentId,
        KLIPClaimNo: lifeJClaimId,
      },
    });

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
