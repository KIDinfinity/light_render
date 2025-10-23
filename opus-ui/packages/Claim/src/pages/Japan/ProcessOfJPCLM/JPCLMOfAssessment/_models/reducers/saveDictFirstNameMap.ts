import lodash from 'lodash';
import { ePayablesType } from '../../Enum';

const saveDictFirstNameMap = (state: any, action: any) => {
  const { claimInsuredIdList, policyBeneficiaryList, policyOwnerList } = action.payload;
  const insured = lodash.map(claimInsuredIdList, (item) => ({
    dictCode: item.firstName,
    dictName: item.firstName,
    beyond: [ePayablesType.premium, ePayablesType.capitalsum],
    gender: item.gender,
    policyId: item.policyId,
  }));
  const benefic = lodash.map(policyBeneficiaryList, (item) => ({
    dictCode: item.firstName,
    dictName: item.firstName,
    beyond: [ePayablesType.capitalsum],
    gender: item.gender,
    policyId: item.policyId,
  }));
  const owner = lodash.map(policyOwnerList, (item) => ({
    dictCode: item.firstName,
    dictName: item.firstName,
    beyond: [ePayablesType.capitalsum],
    gender: item.gender,
    policyId: item.policyId,
  }));
  const dictFirstNameMap = lodash.reduce(
    [...insured, ...benefic, ...owner],
    (result, item) => {
      result[item.policyId] = lodash.compact(lodash.concat(result[item.policyId], [{ ...item }]));
      return result;
    },
    {}
  );
  return {
    ...state,
    dictFirstNameMap,
  };
};

export default saveDictFirstNameMap;
