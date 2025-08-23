import { isArray, map, omit } from 'lodash';

export default (incidentList: any[] = [], delFields: string[]) => {
  if (!isArray(incidentList) || incidentList.length < 1) return incidentList;
  return map(incidentList, (item: any) => omit(item, delFields));
};
