import { produce } from 'immer';
import lodash from 'lodash';
import { valueIsEmpty } from '@/utils/claimUtils';

const saveTreatmentPayableItem = (state: any, action: any) => {
  const { changedFields, treatmentPayableItemId } = action.payload;

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    const newClaimEntities = draftState.claimEntities;
    const editPayableItem = {
      ...newClaimEntities.treatmentPayableListMap[treatmentPayableItemId],
      ...changedFields,
    };
    const fieldsArray = Object.entries(changedFields);

    if (fieldsArray.length === 1) {
      const [name, { value }] = fieldsArray[0];

      // 修改调整支付金额
      if (name === 'assessorOverrideAmount') {
        editPayableItem.payableAmount = null;
        if (lodash.isNumber(value)) {
          editPayableItem.payableAmount = value;
        } else if (
          valueIsEmpty(value) &&
          lodash.isNumber(editPayableItem.systemCalculationAmount)
        ) {
          editPayableItem.payableAmount = editPayableItem.systemCalculationAmount;
        }
      }
    }
    newClaimEntities.treatmentPayableListMap[treatmentPayableItemId] = editPayableItem;
    draftState.claimEntities = newClaimEntities;
  });

  return { ...nextState };
};

export default saveTreatmentPayableItem;
