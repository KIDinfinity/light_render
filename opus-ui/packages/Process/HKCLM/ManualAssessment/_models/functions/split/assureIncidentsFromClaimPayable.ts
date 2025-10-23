import { compact, isArray, map, uniqBy, flatten } from 'lodash';
import getTreatmentList from './getTreatmentList';

export default (claimPayableList: any, incidentList: any) => {
  if (!isArray(claimPayableList) || !isArray(incidentList)) return incidentList;

  // 根据确定的claim payable中找到符合要求所有incidentList数据
  const tempIncidentList = compact(claimPayableList).map((claimPayable: any) => {
    return map(incidentList, (incident: any) => {
      if (claimPayable.incidentId === incident.id) {
        const { treatmentPayableList } = claimPayable;
        let { treatmentList } = incident;
        treatmentList = getTreatmentList(treatmentPayableList, treatmentList);
        return { ...incident, treatmentList };
      }
      return null;
    });
  });

  return uniqBy(compact(flatten(tempIncidentList)), 'id');
};
