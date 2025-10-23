import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { filterDuplicatePayable } from 'claim/pages/utils/filterDuplicatePayable';

const saveProcedurePayableItem = (state: any, action: any) => {
  const { changedFields, procedurePayableId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const newClaimEntities = draftState.claimEntities;
    const servicePayableItem = newClaimEntities.procedurePayableListMap[procedurePayableId];

    const editPayableItem = {
      ...servicePayableItem,
      ...changedFields,
      assessorOverrideAmount:
        lodash.size(changedFields) === 1 && lodash.has(changedFields, 'payableAmount')
          ? formUtils.queryValue(changedFields?.payableAmount)
          : servicePayableItem.assessorOverrideAmount,
    };
    const fieldsArray: any = Object.entries(changedFields);
    if (fieldsArray.length === 1) {
      const [name] = fieldsArray[0];

      if (name === 'benefitItemCode') {
        const preBenefitItemCode = formUtils.queryValue(
          lodash.get(servicePayableItem, 'benefitItemCode')
        );
        const preServicePayableList = formUtils.cleanValidateData(
          newClaimEntities.procedurePayableListMap
        );
        const editPayable = formUtils.cleanValidateData(editPayableItem);
        const duplicatePayableList = lodash.filter(
          preServicePayableList,
          (payableItem) =>
            payableItem.serviceItemId === editPayable.serviceItemId &&
            filterDuplicatePayable(payableItem, editPayable, preBenefitItemCode)
        );
        if (lodash.size(duplicatePayableList) > 0) {
          lodash.forEach(duplicatePayableList, (item) => {
            if (
              lodash.isObject(newClaimEntities.procedurePayableListMap[item.id].benefitItemCode)
            ) {
              newClaimEntities.procedurePayableListMap[item.id].benefitItemCode.errors = null;
            }
          });
        }
      }

      if (name === 'payableAmount') {
        editPayableItem.payableAmount = {
          ...(changedFields?.payableAmount || {}),
          value: changedFields?.payableAmount?.value || 0,
        };
      }
    }

    newClaimEntities.procedurePayableListMap[procedurePayableId] = editPayableItem;
    draftState.claimEntities = newClaimEntities;
  });

  return { ...nextState };
};

export default saveProcedurePayableItem;
