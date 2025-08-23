import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { valueIsEmpty } from '@/utils/claimUtils';
import { cleanClaimDecisionError } from '../functions/validateClaimDecision';
import { updateDuplicatePayableError } from '../functions';

const saveServicePayableItem = (state: any, action: any) => {
  const { changedFields, serviceItemPayableId } = action.payload;
  const nextState = produce(state, (draftState) => {
    const newClaimEntities = draftState.claimEntities;
    const servicePayableItem = newClaimEntities.serviceItemPayableListMap[serviceItemPayableId];

    const editPayableItem = {
      ...servicePayableItem,
      ...changedFields,
    };
    const preBenefitItemCode = formUtils.queryValue(
      lodash.get(servicePayableItem, 'benefitItemCode')
    );

    const fieldsArray = Object.entries(changedFields);
    const editPayable = formUtils.cleanValidateData(editPayableItem);

    if (fieldsArray.length === 1) {
      const [name, { value }] = fieldsArray[0];

      if (name === 'benefitItemCode') {
        updateDuplicatePayableError(
          draftState,
          {
            editPayable,
            benefitItemCode: preBenefitItemCode,
          },
          'servicePayable'
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
    }
    newClaimEntities.serviceItemPayableListMap[serviceItemPayableId] = editPayableItem;

    draftState.claimEntities = newClaimEntities;
  });

  return { ...nextState };
};

export default saveServicePayableItem;
