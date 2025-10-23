import lodash from "lodash";
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { AssessmentSettlementLogic } from 'process/JPCLM/ManualAssessment/_models/functions/AssessmentSettlementLogic';

export const VLD_000576 = ({ assessmentDecision, claimPayableListMap, targets }: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  const newClaimPayableListMap = claimPayableListMap

  lodash.map(claimPayableListMap, (claimPayable, claimPayableId) => {
    if (lodash.find(targets, { id: claimPayableId })) {
      newClaimPayableListMap[claimPayableId] = {
        ...(newClaimPayableListMap[claimPayableId] || {}),
        settlementDecision: value,
      };
    }
  });

  const errors = AssessmentSettlementLogic(
    {
      assessmentDecision,
      settlementDecision: value,
      claimPayableListMap
    }
  );

  if (errors) {
    callback(formatMessageApi({ Label_COM_Message: 'MSG_000496' }));
  }

  callback();
};
