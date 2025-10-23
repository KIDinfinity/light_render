import { formUtils } from 'basic/components/Form';

export const cleanClaimDecisionError = (draft: any, editPayableItem: any) => {
  draft.claimEntities.claimPayableListMap[editPayableItem.payableId].claimDecision = {
    value: formUtils.queryValue(
      draft.claimEntities.claimPayableListMap[editPayableItem.payableId].claimDecision
    ),
    errors: null,
  };
};


export default {
  cleanClaimDecisionError
};
