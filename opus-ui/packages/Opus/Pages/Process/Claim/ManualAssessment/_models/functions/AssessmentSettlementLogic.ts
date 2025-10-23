import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { settlementDecision as settlementDecisionEnum } from 'claim/pages/Enum';
import { ClaimDecision } from 'claim/pages/utils/claim';

const map = {
  [ClaimDecision.approve]: {
    decisionList: [
      settlementDecisionEnum['01'],
      settlementDecisionEnum.PC,
      settlementDecisionEnum.PI,
      settlementDecisionEnum.PS,
      settlementDecisionEnum.PP,
    ],
  },
  [ClaimDecision.deny]: {
    decisionList: [
      settlementDecisionEnum['03'],
      settlementDecisionEnum.AD,
      settlementDecisionEnum.BD,
      settlementDecisionEnum.CC,
      settlementDecisionEnum.DT,
      settlementDecisionEnum.ER,
      settlementDecisionEnum.FC,
      settlementDecisionEnum.IC,
      settlementDecisionEnum.MR,
      settlementDecisionEnum.NA,
      settlementDecisionEnum.NC,
      settlementDecisionEnum.NE,
      settlementDecisionEnum.NP,
      settlementDecisionEnum.NS,
      settlementDecisionEnum.PV,
      settlementDecisionEnum.SV,
    ],
  },
  [ClaimDecision.exGratia]: {
    decisionList: [
      settlementDecisionEnum['02'],
      settlementDecisionEnum['04'],
      settlementDecisionEnum['06'],
    ],
  },
};

export const AssessmentSettlementLogic = ({
  assessmentDecision,
  settlementDecision,
  claimPayableListMap,
}: any) => {
  const assessmentDecisionValue = formUtils.queryValue(assessmentDecision);
  const newClaimPayableListMap = formUtils.cleanValidateData(claimPayableListMap);
  const isMultiplePolicyNo =
    lodash.chain(newClaimPayableListMap).map('policyNo').uniq().size().value() > 1;

  return isMultiplePolicyNo && assessmentDecisionValue === ClaimDecision.approve
    ? !lodash.some(newClaimPayableListMap, (item) =>
        map[ClaimDecision.approve].decisionList.includes(item.settlementDecision)
      )
    : assessmentDecisionValue !== ClaimDecision.pending
      ? !lodash.includes(map[assessmentDecisionValue]?.decisionList, settlementDecision)
      : false;
};

export default AssessmentSettlementLogic;
