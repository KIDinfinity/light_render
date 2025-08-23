import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { filterDuplicatePayable } from 'claim/pages/utils/filterDuplicatePayable';
import { basicCreate } from '../functions/payableAdd';
import { add } from '@/utils/precisionUtils';

const saveServicePayableItem = (state: any, action: any) => {
  const { changedFields, serviceItemPayableId, boosterId, hasBooster } = action.payload;
  const nextState = produce(state, (draftState) => {
    const newClaimEntities = draftState.claimEntities;
    const servicePayableItem = newClaimEntities.serviceItemPayableListMap[serviceItemPayableId];

    if (lodash.size(changedFields) === 1 && lodash.has(changedFields, 'payableAmount')) {
      changedFields.payableAmountBeforeDeductible = add(
        formUtils.queryValue(changedFields?.payableAmount) || 0,
        formUtils.queryValue(servicePayableItem?.deductibleNetExpense) || 0
      );
    }

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
      const [name, { value }] = fieldsArray[0];

      if (name === 'benefitItemCode') {
        const preBenefitItemCode = formUtils.queryValue(
          lodash.get(servicePayableItem, 'benefitItemCode')
        );
        const preServicePayableList = formUtils.cleanValidateData(
          newClaimEntities.serviceItemPayableListMap
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
              lodash.isObject(newClaimEntities.serviceItemPayableListMap[item.id].benefitItemCode)
            ) {
              newClaimEntities.serviceItemPayableListMap[item.id].benefitItemCode.errors = null;
            }
          });
        }
      }

      if ((name === 'boosterAmount' || name === 'boosterDays') && !boosterId) {
        const incidentId = servicePayableItem?.incidentId;
        const treatmentId = servicePayableItem?.treatmentId;
        const boosterExtra = lodash.pick(hasBooster, [
          'policyNo',
          'benefitItemCode',
          'coreProductCode',
          'policyCurrency',
          'productPlan',
          'benefitTypeCode',
          'benefitCategory',
        ]);
        lodash.set(boosterExtra, 'productCode', boosterExtra.coreProductCode);
        delete boosterExtra.coreProductCode;
        // const service = [{ id: servicePayableItem?.serviceItemId, [name]: value }];
        basicCreate({
          draftState,
          incidentId,
          treatmentId,
          extra: { ...boosterExtra, id: servicePayableItem?.serviceItemId, [name]: value },
        });
      }
      if (
        lodash.has(changedFields, 'deductibleNetExpense') ||
        lodash.has(changedFields, 'deductibleOtherInsurerDeduction')
      ) {
        draftState.claimEntities.serviceItemPayableListMap[serviceItemPayableId][
          Object.keys(changedFields)[0]
        ] = changedFields[Object.keys(changedFields)[0]].value;
        editPayableItem.deductibleAmount = add(
          formUtils.queryValue(servicePayableItem?.deductibleOtherInsurerDeduction) || 0,
          formUtils.queryValue(servicePayableItem?.deductibleNetExpense) || 0
        );
      }
    }
    if (lodash.has(changedFields, 'boosterAmount') && boosterId) {
      newClaimEntities.serviceItemPayableListMap[boosterId].payableAmount =
        changedFields?.boosterAmount;
      newClaimEntities.serviceItemPayableListMap[boosterId].assessorOverrideAmount =
        changedFields?.boosterAmount?.value;
    }
    if (lodash.has(changedFields, 'boosterDays') && boosterId) {
      newClaimEntities.serviceItemPayableListMap[boosterId].payableDays =
        changedFields?.boosterDays;
    }
    newClaimEntities.serviceItemPayableListMap[serviceItemPayableId] = editPayableItem;
    draftState.claimEntities = newClaimEntities;
  });

  return { ...nextState };
};

export default saveServicePayableItem;
