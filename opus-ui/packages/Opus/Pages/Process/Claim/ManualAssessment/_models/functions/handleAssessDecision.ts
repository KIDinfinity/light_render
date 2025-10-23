import lodash from 'lodash';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { formUtils } from 'basic/components/Form';

export const handleAssessDecision = (claimPayableList: any[], claimDecision: any) => {
  if (lodash.isEmpty(claimPayableList)) return claimDecision.assessmentDecision;

  const getClaimDecision = (newAssessmentDecision: string) => {
    return formUtils.queryValue(claimDecision.assessmentDecision) === newAssessmentDecision
      ? claimDecision.assessmentDecision
      : newAssessmentDecision;
  };

  const existPending = lodash.some(
    claimPayableList,
    (payableItem) => payableItem.claimDecision === ClaimDecision.pending
  );
  // 存在pending
  if (existPending) return getClaimDecision(ClaimDecision.pending);

  //VENUSJP-6941 中去掉exGratia相关逻辑
  // const existExgratia = lodash.some(
  //   claimPayableList,
  //   (payableItem) => payableItem.claimDecision === ClaimDecision.exGratia
  // );

  // if (existExgratia) return ClaimDecision.exGratia;

  // 不存在exGratia和pending的时候才进一步判断
  const existApprove = lodash.some(
    claimPayableList,
    (payableItem) => payableItem.claimDecision === ClaimDecision.approve
  );

  if (existApprove) return getClaimDecision(ClaimDecision.approve);

  const allIsDeny = lodash.every(
    claimPayableList,
    (payableItem) => payableItem.claimDecision === ClaimDecision.deny
  );

  if (allIsDeny) return getClaimDecision(ClaimDecision.deny);

  return claimDecision.assessmentDecision;
};

export default handleAssessDecision;
