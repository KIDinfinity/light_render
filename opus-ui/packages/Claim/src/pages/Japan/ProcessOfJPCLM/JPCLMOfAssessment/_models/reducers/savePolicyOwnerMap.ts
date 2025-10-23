import lodash from 'lodash';

const savePolicyOwnerMap = (state: any, action: any) => {
  const policyOwnerListMap = {};

  lodash.map(action.payload, (policyOwnerItem: any) => {
    policyOwnerListMap[policyOwnerItem.policyId] = policyOwnerItem;
  });

  return {
    ...state,
    policyOwnerListMap,
  };
};

export default savePolicyOwnerMap;
