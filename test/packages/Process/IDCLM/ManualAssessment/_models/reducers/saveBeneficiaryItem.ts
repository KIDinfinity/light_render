import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const saveBeneficiaryItem = (state: any, action: any) => {
  const { changedFields, beneficiaryId } = action.payload;
  const finalChangedFields = { ...changedFields };
  if (
    lodash.has(changedFields, 'organization') &&
    lodash.isBoolean(formUtils.queryValue(changedFields.organization))
  ) {
    finalChangedFields.organization = changedFields.organization.value ? 1 : 0;
  }

  const nextState = produce(state, (draftState) => {
    draftState.claimEntities.beneficiaryListMap[beneficiaryId] = {
      ...state.claimEntities.beneficiaryListMap[beneficiaryId],
      ...finalChangedFields,
    };
  });

  return { ...nextState };
};

export default saveBeneficiaryItem;
