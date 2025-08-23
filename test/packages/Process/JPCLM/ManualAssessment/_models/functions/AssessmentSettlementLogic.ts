import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { settlementDecision as settlementDecisionEnum } from 'claim/pages/Enum';
import { ClaimDecision } from 'claim/pages/utils/claim';

const map = {
  [ClaimDecision.approve]: {
    decisionList: [settlementDecisionEnum['01']],
  },
  [ClaimDecision.deny]: {
    decisionList: [settlementDecisionEnum['03']],
  },
  [ClaimDecision.exGratia]: {
    decisionList: [
      settlementDecisionEnum['02'],
      settlementDecisionEnum['04'],
      settlementDecisionEnum['06'],
    ],
  },
};

export const AssessmentSettlementLogic = ({ assessmentDecision, settlementDecision, claimPayableListMap }: any) => {
  const assessmentDecisionValue = formUtils.queryValue(assessmentDecision)
  const newClaimPayableListMap = formUtils.cleanValidateData(claimPayableListMap)
  const isMultiplePolicyNo = lodash.chain(newClaimPayableListMap).map('policyNo').uniq().size().value() > 1

  return (isMultiplePolicyNo && assessmentDecisionValue === ClaimDecision.approve) ?
    !lodash.some(newClaimPayableListMap, { settlementDecision: settlementDecisionEnum['01'] }) :
    !lodash.includes(map[assessmentDecisionValue]?.decisionList, settlementDecision);
};

export default AssessmentSettlementLogic;
