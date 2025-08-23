import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { cleanClaimDecisionError } from '../functions/validateClaimDecision';
import { updateDuplicatePayableError } from '../functions';

const saveProcedurePayableItem = (state: any, action: any) => {
  const { id, changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const draft = draftState;

    const procedurePayableItem = draft.claimEntities.procedurePayableListMap[id];
    const editPayableItem = {
      ...procedurePayableItem,
      ...changedFields,
    };
    const preBenefitItemCode = formUtils.queryValue(
      lodash.get(procedurePayableItem, 'benefitItemCode')
    );
    if (lodash.size(changedFields) > 1) return;

    const editPayable = formUtils.cleanValidateData(editPayableItem);
    if (lodash.has(changedFields, 'benefitItemCode')) {
      updateDuplicatePayableError(
        draftState,
        {
          editPayable,
          benefitItemCode: preBenefitItemCode,
        },
        'procedurePayable'
      );
    }

    const [name, { value }] = Object.entries(changedFields)[0];

    const extra: any = {};

    if (name === 'assessorOverrideAmount') {
      cleanClaimDecisionError(draft, editPayableItem);
      editPayableItem.payableAmount = lodash.isNumber(value)
        ? value
        : procedurePayableItem?.systemCalculationAmount;
    }
    if (name === 'reversalFlag') {
      editPayableItem.changeObjectAmount =
        value === 'N' ? null : Math.abs(editPayableItem.payableAmount);
    }

    draft.claimEntities.procedurePayableListMap[id] = editPayableItem;
  });

  return { ...nextState };
};

export default saveProcedurePayableItem;
