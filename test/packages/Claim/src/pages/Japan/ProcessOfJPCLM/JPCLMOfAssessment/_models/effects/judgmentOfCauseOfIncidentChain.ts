import lodash from 'lodash';

export default function* judgmentOfCauseOfIncidentChain({ payload }: any, { put }: any) {
  const { incidentList } = payload;
  if (lodash.isArray(incidentList)) {
    const incidentIdList = lodash.map(incidentList, (item) => item.id);
    yield put({
      type: 'judgmentOfCauseOfIncident',
      payload: { incidentIdList },
    });
  }
}
