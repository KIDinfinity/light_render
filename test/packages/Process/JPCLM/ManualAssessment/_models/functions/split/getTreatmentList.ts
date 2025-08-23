import { compact, isArray, map, uniqBy, flatten, some } from 'lodash';

export default (treatmentPayableList: any, treatmentList: any) => {
  if (!isArray(treatmentPayableList) || !isArray(treatmentList)) return treatmentList;

  // 根据确定的treatmentList找到符合要求所有treatment payable数据
  const temp = map(compact(treatmentPayableList), (treatmentPayable: any) => {
    return map(treatmentList, (treatment: any) => {
      if (treatment.treatmentType === 'OP' && some(treatment.opTreatmentList, item => item.id === treatmentPayable.treatmentId)) {
        return treatment;
      }
      if (treatmentPayable.treatmentId === treatment.id) {
        return treatment;
      }
      return null;
    });
  });
  return uniqBy(compact(flatten(temp)), 'id');
};
