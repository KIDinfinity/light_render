import lodash from 'lodash';

const savePolicyInsuredListMap = (state: any, action: any) => {
  const policyInsuredListMap = {};

  lodash.map(action.payload, (insuredItem) => {
    policyInsuredListMap[insuredItem.policyId] = insuredItem;
  });

  return {
    ...state,
    policyInsuredListMap,
  };
};

export default savePolicyInsuredListMap;
