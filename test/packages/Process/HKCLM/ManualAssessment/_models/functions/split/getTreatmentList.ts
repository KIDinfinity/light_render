import { compact, isArray, map, uniqBy, flatten } from 'lodash';

export default (treatmentPayableList: any, treatmentList: any) => {
  if (!isArray(treatmentPayableList) || !isArray(treatmentList)) return treatmentList;

  // 根据确定的treatmentList找到符合要求所有treatment payable数据
  const temp = compact(treatmentPayableList).map((treatmentPayable: any) => {
    return map(treatmentList, (treatment: any) => {
      if (treatmentPayable.treatmentId === treatment.id) {
        return treatment;
      }
      return null;
    });
  });
  return uniqBy(compact(flatten(temp)), 'id');
};
