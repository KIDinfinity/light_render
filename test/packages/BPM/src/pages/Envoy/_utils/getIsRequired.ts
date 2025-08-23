import lodash from 'lodash';

export default (thPendPolicyReasonInfo: any, reasonListValArr: string) => {
  const lastSelectReason = lodash.find(
    thPendPolicyReasonInfo,
    (policyReasonInfo: any) => policyReasonInfo.code === lodash.last(reasonListValArr)
  );
  const requiredDate = lastSelectReason && lastSelectReason?.requiredDate;
  const requiredOtherReason = lastSelectReason && lastSelectReason?.requiredOtherReason;
  return {
    lastSelectReason,
    requiredDate,
    requiredOtherReason,
  };
};
