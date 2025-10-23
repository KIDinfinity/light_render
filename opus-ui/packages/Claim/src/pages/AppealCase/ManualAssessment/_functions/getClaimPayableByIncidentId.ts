import lodash from 'lodash';

export default function getClaimPayableByIncidentId(claimPayableListMap: any, incidentId: string) {
  if (lodash.isEmpty(claimPayableListMap) || !lodash.isString(incidentId)) return {};
  return lodash
    .chain(claimPayableListMap)
    .filter((item: any) => item.incidentId === incidentId)
    .first()
    .value();
}
