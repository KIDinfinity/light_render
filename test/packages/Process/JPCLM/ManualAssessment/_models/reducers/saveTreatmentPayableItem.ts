import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { valueIsEmpty } from '@/utils/claimUtils';
import { cleanClaimDecisionError } from '../functions/validateClaimDecision';
import { updateDuplicatePayableError } from '../functions';

const saveTreatmentPayableItem = (state: any, action: any) => {
  const { changedFields, treatmentPayableItemId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const newClaimEntities = draftState.claimEntities;
    const treatmentPayableItem = newClaimEntities.treatmentPayableListMap[treatmentPayableItemId];
    const editPayableItem = {
      ...treatmentPayableItem,
      ...changedFields,
    };
    const preBenefitItemCode = formUtils.queryValue(
      lodash.get(treatmentPayableItem, 'benefitItemCode')
    );

    const fieldsArray = Object.entries(changedFields);
    const editPayable = formUtils.cleanValidateData(editPayableItem);

    if (fieldsArray.length === 1) {
      const [name, { value }] = fieldsArray[0];
      if (name === 'benefitItemCode') {
        // submit的时候 duplicate的payable会出现error 当change其中一个payable的时候 需要清空另一个payable的error
        updateDuplicatePayableError(
          draftState,
          {
            editPayable,
            benefitItemCode: preBenefitItemCode,
          },
          'treatmentPayable'
        );
      }

      // 修改调整支付金额
      if (name === 'assessorOverrideAmount') {
        editPayableItem.payableAmount = null;
        cleanClaimDecisionError(draftState, editPayableItem);

        if (lodash.isNumber(value)) {
          editPayableItem.payableAmount = value;
        } else if (
          valueIsEmpty(value) &&
          lodash.isNumber(editPayableItem.systemCalculationAmount)
        ) {
          editPayableItem.payableAmount = editPayableItem.systemCalculationAmount;
        }
      }
      if (name === 'reversalFlag') {
        editPayableItem.changeObjectAmount =
          value === 'N' ? null : Math.abs(editPayableItem.payableAmount);
      }
    }

    newClaimEntities.treatmentPayableListMap[treatmentPayableItemId] = editPayableItem;
    draftState.claimEntities = newClaimEntities;
  });

  return { ...nextState };
};

export default saveTreatmentPayableItem;
