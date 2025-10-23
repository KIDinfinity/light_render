import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { changedFields, productCode, policyNo, incidentId, factorCode, policyYear }: any = payload;
  if (lodash.size(changedFields) !== 1) return state;

  const factorItem =
    state.adjustmentFactorListMap[`${policyNo}${productCode}${incidentId}`].factorList[factorCode];

  state.adjustmentFactorListMap[`${policyNo}${productCode}${incidentId}`].factorList[factorCode] = {
    ...factorItem,
    list: lodash.map(factorItem.list, (el: any) => {
      return el.policyYear === policyYear
        ? {
            ...el,
            ...changedFields,
          }
        : el;
    }),
  };

  return state;
};
