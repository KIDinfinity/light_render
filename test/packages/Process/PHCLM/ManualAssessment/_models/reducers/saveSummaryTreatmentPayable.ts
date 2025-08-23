import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { mapToPayableListMap } from 'process/Utils/benefitCategoryUtils';

const saveSummaryTreatmentPayable = (state: any, { payload }: any) => {
  const { changedFields, id, benefitCategory } = payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities[mapToPayableListMap?.[benefitCategory]][id] = {
      ...draftState.claimEntities?.[mapToPayableListMap?.[benefitCategory]]?.[id],
      ...changedFields,
    };

    if (lodash.size(changedFields) === 1 && lodash.has(changedFields, 'payableAmount')) {
      draftState.claimEntities[mapToPayableListMap?.[benefitCategory]][id].payableAmount = {
        ...(changedFields?.payableAmount || {}),
        value: changedFields?.payableAmount?.value || 0,
      };
      draftState.claimEntities[mapToPayableListMap?.[benefitCategory]][
        id
      ].assessorOverrideAmount = formUtils.queryValue(changedFields?.payableAmount);
    }
  });

  return { ...nextState };
};

export default saveSummaryTreatmentPayable;
