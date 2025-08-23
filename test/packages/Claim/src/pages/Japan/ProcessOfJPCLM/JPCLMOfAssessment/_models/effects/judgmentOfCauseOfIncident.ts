import lodash from 'lodash';
import { judgmentOfCauseOfIncident as reCauseOfIncident } from '@/services/claimJpclmClaimControllerService';

export default function* judgmentOfCauseOfIncident({ payload }: any, { call, put }: any) {
  const { incidentId, incidentIdList = [] } = payload;
  const target = lodash.compact([incidentId, ...incidentIdList]);
  const claimData = yield put.resolve({ type: 'getDataForSubmit' });
  const incidentItem = lodash.map(claimData.incidentList, (item) => {
    if (lodash.indexOf(target, item.id) !== -1) {
      return item;
    }
  });

  if (!lodash.isEmpty(incidentItem)) {
    const response = yield call(reCauseOfIncident, lodash.compact(incidentItem));
    if (response && response.success && response.resultData) {
      yield put({
        type: 'updateCauseOfIncident',
        payload: response.resultData,
      });
    }

    return response;
  }
  return '';
}
