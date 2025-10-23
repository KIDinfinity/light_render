import { isArray, map } from 'lodash';

export default (incidentList: any[] = []) => {
  if (!isArray(incidentList) || incidentList.length < 1) return incidentList;
  return map(incidentList, (item: any) => ({ ...item, claimTypeTemp: item.claimTypeArray }));
};
