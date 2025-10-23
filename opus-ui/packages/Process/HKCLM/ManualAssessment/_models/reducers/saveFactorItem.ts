import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload }: any) => {
  const { changedFields, productCode, policyNo, incidentId, factorCode, policyYear }: any = payload;
  if (lodash.size(changedFields) !== 1) return state;
  const factorItem =
    state.adjustmentFactorListMap[`${policyNo}${productCode}${incidentId}`].factorList[factorCode];
  if (lodash.size(changedFields) === 1 && factorItem.list[0].originFactorValue === undefined) {
    factorItem.list[0].originFactorValue = formUtils.queryValue(factorItem.list[0]?.factorValue)
  }
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
