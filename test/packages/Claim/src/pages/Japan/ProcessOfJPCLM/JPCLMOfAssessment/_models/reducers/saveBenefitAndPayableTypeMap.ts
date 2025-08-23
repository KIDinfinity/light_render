import lodash from 'lodash';

const saveBenefitAndPayableTypeMap = (state: any, action: any) => {
  const beneficiaryPayableTypeMap = {};

  lodash.map(action.payload, (benefitTypeItem: any) => {
    beneficiaryPayableTypeMap[benefitTypeItem.benefitTypeCode] =
      benefitTypeItem.beneficiaryPayableType;
  });

  return {
    ...state,
    beneficiaryPayableTypeMap,
  };
};

export default saveBenefitAndPayableTypeMap;
