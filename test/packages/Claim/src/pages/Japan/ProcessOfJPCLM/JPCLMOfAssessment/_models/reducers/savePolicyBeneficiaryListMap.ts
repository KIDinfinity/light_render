import lodash from 'lodash';

const savePolicyBeneficiaryListMap = (state: any, action: any) => {
  const policyBeneficiaryListMap = {};

  lodash.map(action.payload, (benefitTypeItem) => {
    policyBeneficiaryListMap[benefitTypeItem.policyId] = benefitTypeItem;
  });

  return {
    ...state,
    policyBeneficiaryListMap,
  };
};

export default savePolicyBeneficiaryListMap;
