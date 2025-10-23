import { compact, isArray, map, uniqBy, flatten } from 'lodash';
import getTreatmentPayable from './getTreatmentPayable';

export default (claimPayableList: any, incidentList: any) => {
  if (!isArray(claimPayableList) || !isArray(incidentList)) return claimPayableList;

  // 根据确定的incidentList中找到符合要求所有claim payable数据
  const tempClaimPayableList = map(compact(incidentList), (incident: any) => {
    return map(claimPayableList, (claimPayable: any) => {
      if (claimPayable.incidentId === incident.id) {
        let { treatmentPayableList } = claimPayable;
        const { treatmentList } = incident;
        treatmentPayableList = getTreatmentPayable(treatmentPayableList, treatmentList);
        return { ...claimPayable, treatmentPayableList };
      }
      return null;
    });
  });

  return uniqBy(compact(flatten(tempClaimPayableList)), 'id');
};
