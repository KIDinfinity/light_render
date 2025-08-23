import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { Booster } from 'claim/enum/Booster';
import { filterDuplicatePayable } from 'claim/pages/utils/filterDuplicatePayable';
import { Payable } from 'process/Utils/Payable';

const saveServicePayableItem = (state: any, action: any) => {
  const { changedFields, serviceItemPayableId, boosterId, hasBooster } = action.payload;
  const nextState = produce(state, (draftState) => {
    const newClaimEntities = draftState.claimEntities;
    const servicePayableItem = newClaimEntities.serviceItemPayableListMap[serviceItemPayableId];

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

        const addBoosterData = Payable.addReimbursementPayable({
          claimEntities: formUtils.cleanValidateData(draftState.claimEntities),
          claimProcessData: formUtils.cleanValidateData(draftState.claimProcessData),
          // update的时候incidentId/treatmentId不需要传
          incidentId,
          treatmentId,
          extra: {
            ...boosterExtra,
            id: servicePayableItem?.serviceItemId,
            [name]: value,
            booster: Booster.Yes,
          },
        });
        // TODO：这里因为extra.boosterAmount/extra.boosterDays为空,所以不新增

        const boosterPayableId = addBoosterData.payableId;
        Payable.changeAddData({
          draftState,
          addData: addBoosterData,
        });

        const { claimDecision, denyCode, denyReason, exGratiaCode, exGratiaReason } =
          draftState.claimEntities?.claimPayableListMap?.[servicePayableItem?.payableId] || {};
        draftState.claimEntities.claimPayableListMap[boosterPayableId] = {
          ...(draftState.claimEntities?.claimPayableListMap?.[boosterPayableId] || {}),
          claimDecision,
          denyCode,
          denyReason,
          exGratiaCode,
          exGratiaReason,
        };
      }
      if (lodash.has(changedFields, 'boosterAmount') && boosterId) {
        newClaimEntities.serviceItemPayableListMap[boosterId].assessorOverrideAmount =
          changedFields?.boosterAmount?.value || 0;
      }

      if (name === 'payableAmount' && !draftState.claimProcessData?.appeal) {
        editPayableItem.payableAmount = {
          ...(changedFields?.payableAmount || {}),
          value: changedFields?.payableAmount?.value || 0,
        };
      }
    }
    if (lodash.has(changedFields, 'boosterAmount') && boosterId) {
      if (editPayableItem.booster === 'Y') {
        editPayableItem.payableAmount = changedFields?.boosterAmount?.value;
      } else {
        newClaimEntities.serviceItemPayableListMap[boosterId].payableAmount =
          changedFields?.boosterAmount?.value || 0;
      }
    }
    if (lodash.has(changedFields, 'boosterDays') && boosterId) {
      if (editPayableItem.booster === 'Y') {
        editPayableItem.payableDays = changedFields?.boosterDays?.value;
      } else {
        newClaimEntities.serviceItemPayableListMap[boosterId].payableDays =
          changedFields?.boosterDays?.value;
      }
    }

    newClaimEntities.serviceItemPayableListMap[serviceItemPayableId] = editPayableItem;
    draftState.claimEntities = newClaimEntities;
  });

  return { ...nextState };
};

export default saveServicePayableItem;
