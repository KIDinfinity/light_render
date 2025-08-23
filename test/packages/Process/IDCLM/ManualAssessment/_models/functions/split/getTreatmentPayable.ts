import { compact, isArray, map, uniqBy, flatten } from 'lodash';

export default (treatmentPayableList: any, treatmentList: any) => {
  if (!isArray(treatmentPayableList) || !isArray(treatmentList)) return treatmentPayableList;

  // 根据确定的treatmentList找到符合要求所有treatment payable数据
  const temp = compact(treatmentList).map((treatment: any) => {
    return map(treatmentPayableList, (treatmentPayable: any) => {
      if (treatmentPayable.treatmentId === treatment.id) {
        return treatmentPayable;
      }
      return null;
    });
  });
  return uniqBy(compact(flatten(temp)), 'id');
};
