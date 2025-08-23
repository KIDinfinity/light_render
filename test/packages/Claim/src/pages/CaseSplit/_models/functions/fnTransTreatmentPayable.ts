import lodash, { isEmpty, chain, get } from 'lodash';

export default (payableData: any, treatmentListMap: any) => {
  if (isEmpty(payableData)) return [];
  return chain(payableData)
    .compact()
    .map((item) => {
      const treatmentId = get(item, 'treatmentId');
      let treatment = treatmentListMap[treatmentId] || {};
      if (isEmpty(treatment)) {
        lodash.every(treatmentListMap, (item) => {
          if (item.treatmentType === 'OP' && lodash.some(item.opTreatmentList, opTreatment => opTreatment.id === treatmentId)) {
            treatment = item;
          }
        })
      }
      return {
        treatmentPayable: item,
        treatmentNo: treatment.treatmentNo,
        treatment,
      };
    })
    .sortBy('treatmentNo')
    .value();
};
