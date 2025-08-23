import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { filterDuplicatePayable } from 'claim/pages/utils/filterDuplicatePayable';

const saveProcedurePayableItemAddCallback = (state: any, action: any) => {
  const { claimEntities, procedurePayableItemAdd } = state;

  if (!formUtils.queryValue(procedurePayableItemAdd.benefitItemCode)) {
    return {
      ...state,
    };
  }
  const newClaimEntities = lodash.cloneDeep(claimEntities);
  const { treatmentPayableListMap, claimPayableListMap } = newClaimEntities;
  let newProcedurePayableAddItem = { ...procedurePayableItemAdd };
  const editPayable = formUtils.cleanValidateData(newProcedurePayableAddItem);
  const treatmentPayableListMapEntries = Object.entries(
    formUtils.cleanValidateData(treatmentPayableListMap)
  );
  const treatmentPayableArray: any = [];
  lodash.map(treatmentPayableListMapEntries, (item: any) => {
    if (
      item[1].treatmentId === newProcedurePayableAddItem.treatmentId &&
      filterDuplicatePayable(item[1], editPayable) &&
      claimPayableListMap[item[1]?.payableId].benefitCategory === eBenefitCategory.S
    ) {
      treatmentPayableArray.push(item[1]);
    }
  });
  // 确认treatmentPayable是否有对应的定责
  if (treatmentPayableArray && treatmentPayableArray.length === 1) {
    const currentTreatmentPayableItem = treatmentPayableArray[0];
    let curPayableIsAlreadyExist = false;
    lodash.map(currentTreatmentPayableItem.procedurePayableList, (itemId) => {
      const procedurePayableItem = newClaimEntities.procedurePayableListMap[itemId];
      if (
        procedurePayableItem.procedureId === editPayable.procedureId &&
        procedurePayableItem.benefitItemCode === editPayable.benefitItemCode
      ) {
        curPayableIsAlreadyExist = true;
      }
    });
    if (!curPayableIsAlreadyExist) {
      newProcedurePayableAddItem.payableId = currentTreatmentPayableItem.payableId;
      newProcedurePayableAddItem.treatmentPayableId = currentTreatmentPayableItem.id;
      newClaimEntities.procedurePayableListMap[
        newProcedurePayableAddItem.id
      ] = newProcedurePayableAddItem;
      newClaimEntities.treatmentPayableListMap[
        newProcedurePayableAddItem.treatmentPayableId
      ].procedurePayableList = [
        ...(newClaimEntities.treatmentPayableListMap[newProcedurePayableAddItem.treatmentPayableId]
          .procedurePayableList || []),
        newProcedurePayableAddItem.id,
      ];
      newProcedurePayableAddItem = null;
    }
  }
  const nextState = produce(state, (draftState) => {
    draftState.claimEntities = newClaimEntities;
    draftState.procedurePayableItemAdd = newProcedurePayableAddItem;
  });

  return { ...nextState };
};

export default saveProcedurePayableItemAddCallback;
