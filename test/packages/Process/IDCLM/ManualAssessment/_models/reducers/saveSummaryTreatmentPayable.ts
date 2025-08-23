import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';

const saveSummaryTreatmentPayable = (state: any, { payload }: any) => {
  const { changedFields, id, benefitCategory } = payload;

  const nextState = produce(state, (draftState: any) => {
    const map = {
      [eBenefitCategory.Cashless]: 'treatmentPayableListMap',
      [eBenefitCategory.Aipa]: 'accidentBenefitPayableListMap',
    };

    draftState.claimEntities[map?.[benefitCategory]][id] = {
      ...draftState.claimEntities?.[map?.[benefitCategory]]?.[id],
      ...changedFields,
    };

    if (lodash.size(changedFields) === 1 && lodash.has(changedFields, 'payableAmount')) {
      draftState.claimEntities[map?.[benefitCategory]][id].payableAmount = {
        ...(changedFields?.payableAmount || {}),
        value: changedFields?.payableAmount?.value || 0,
      };
      draftState.claimEntities[map?.[benefitCategory]][
        id
      ].assessorOverrideAmount = formUtils.queryValue(changedFields?.payableAmount);
    }
  });

  return { ...nextState };
};

export default saveSummaryTreatmentPayable;
