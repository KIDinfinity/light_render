import lodash from 'lodash';
import { ClaimDecision } from 'claim/pages/utils/claim';

export const handleAssessDecision = (claimPayableList: any[], claimDecision: any) => {
  if (lodash.isEmpty(claimPayableList)) return claimDecision.assessmentDecision;

  const existPending = lodash.some(
    claimPayableList,
    (payableItem) => payableItem.claimDecision === ClaimDecision.pending
  );
  // 存在pending
  if (existPending) return ClaimDecision.pending;

  const existExgratia = lodash.some(
    claimPayableList,
    (payableItem) => payableItem.claimDecision === ClaimDecision.exGratia
  );

  if (existExgratia) return ClaimDecision.exGratia;

  // 不存在exGratia和pending的时候才进一步判断
  const existApprove = lodash.some(
    claimPayableList,
    (payableItem) => payableItem.claimDecision === ClaimDecision.approve
  );

  if (existApprove) return ClaimDecision.approve;

  const allIsDeny = lodash.every(
    claimPayableList,
    (payableItem) => payableItem.claimDecision === ClaimDecision.deny
  );

  if (allIsDeny) return ClaimDecision.deny;

  const allIsNA = lodash.every(
    claimPayableList,
    (payableItem) => payableItem.claimDecision === ClaimDecision.NA
  );

  if (allIsNA) return ClaimDecision.NA;

  return claimDecision.assessmentDecision;
};

export default handleAssessDecision;
