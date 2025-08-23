import lodash from 'lodash';
import {
  VLD_000939,
  VLD_000940,
  VLD_000934,
  VLD_000334_PH,
  VLD_000928,
  VLD_000929,
} from '../_validators/sectionValidators';

const getPayoutAmountError = (
  claimData,
  { claimPayableListMap, treatmentPayableListMap, serviceItemPayableListMap },
  claimProcessData
) => {
  const policyBenefitList = lodash.get(claimData, 'policyBenefitList');
  const claimDecision = lodash.get(claimProcessData, 'claimDecision');
  const claimPayableList = lodash.values(claimPayableListMap);

  const errors = [
    VLD_000939(claimPayableList, claimDecision),
    VLD_000940(claimPayableList, treatmentPayableListMap, serviceItemPayableListMap),
    VLD_000934(policyBenefitList, claimPayableList),
    VLD_000334_PH(policyBenefitList, claimPayableList),
    VLD_000928(policyBenefitList),
    VLD_000929(policyBenefitList),
  ].filter((i) => i);

  return errors;
};

export default getPayoutAmountError;
