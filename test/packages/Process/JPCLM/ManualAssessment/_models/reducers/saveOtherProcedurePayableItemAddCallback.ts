import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { filterDuplicatePayable } from 'claim/pages/utils/filterDuplicatePayable';

const saveOtherProcedurePayableItemAddCallback = (state: any, action: any) => {
  const { claimEntities, otherProcedurePayableItemAdd } = state;
  if (!formUtils.queryValue(otherProcedurePayableItemAdd.benefitItemCode)) {
    return {
      ...state,
    };
  }
  const newClaimEntities = lodash.cloneDeep(claimEntities);
  const { treatmentPayableListMap, claimPayableListMap } = newClaimEntities;
  let newOtherProcedurePayableAddItem = { ...otherProcedurePayableItemAdd };
  const editPayable = formUtils.cleanValidateData(newOtherProcedurePayableAddItem);
  const treatmentPayableListMapEntries = Object.entries(
    formUtils.cleanValidateData(treatmentPayableListMap)
  );

  const treatmentPayableArray: any = [];
  lodash.map(treatmentPayableListMapEntries, (item: any) => {
    if (
      item[1].treatmentId === editPayable.treatmentId &&
      // 加这个逻辑判断是为了可以map中treatmentPayable(otherProcedurePayable没有policyYear)
      filterDuplicatePayable(item[1], { ...editPayable, policyYear: item[1].policyYear }) &&
      claimPayableListMap[item[1]?.payableId].benefitCategory === eBenefitCategory.T
    ) {
      treatmentPayableArray.push(item[1]);
    }
  });

  // 确认treatmentPayable是否有对应的定责
  if (treatmentPayableArray && treatmentPayableArray.length === 1) {
    const currentTreatmentPayableItem = treatmentPayableArray[0];
    let curPayableIsAlreadyExist = false;
    lodash.map(currentTreatmentPayableItem.otherProcedurePayableList, (itemId) => {
      const procedurePayableItem = newClaimEntities.otherProcedurePayableListMap[itemId];

      if (
        procedurePayableItem.otherProcedureId === editPayable.otherProcedureId &&
        procedurePayableItem.benefitItemCode === editPayable.benefitItemCode
      ) {
        curPayableIsAlreadyExist = true;
      }
    });

    if (!curPayableIsAlreadyExist) {
      newOtherProcedurePayableAddItem.payableId = currentTreatmentPayableItem.payableId;
      newOtherProcedurePayableAddItem.treatmentPayableId = currentTreatmentPayableItem.id;
      newClaimEntities.otherProcedurePayableListMap[
        newOtherProcedurePayableAddItem.id
      ] = newOtherProcedurePayableAddItem;
      newClaimEntities.treatmentPayableListMap[
        newOtherProcedurePayableAddItem.treatmentPayableId
      ].otherProcedurePayableList = [
        ...(newClaimEntities.treatmentPayableListMap[
          newOtherProcedurePayableAddItem.treatmentPayableId
        ].otherProcedurePayableList || []),
        newOtherProcedurePayableAddItem.id,
      ];
      newOtherProcedurePayableAddItem = null;
    }
  }
  const nextState = produce(state, (draftState) => {
    draftState.claimEntities = newClaimEntities;
    draftState.otherProcedurePayableItemAdd = newOtherProcedurePayableAddItem;
  });

  return { ...nextState };
};

export default saveOtherProcedurePayableItemAddCallback;
