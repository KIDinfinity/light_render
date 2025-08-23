import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import CalculateByPolicyYear from 'basic/enum/CalculateByPolicyYear';

const saveTreatmentPayableAddItemCallback = (state: any, action: any) => {
  const { claimEntities, treatmentPayableAddItem } = state;
  if (!formUtils.queryValue(treatmentPayableAddItem.benefitTypeCode)) {
    return {
      ...state,
    };
  }
  const newClaimEntities = lodash.cloneDeep(claimEntities);

  let newTreatmentPayableAddItem = { ...treatmentPayableAddItem };
  const claimPayableListEntries = Object.entries(
    formUtils.cleanValidateData(newClaimEntities.claimPayableListMap)
  );
  const incidentPayableArray: any = [];
  const editPayable = formUtils.cleanValidateData(newTreatmentPayableAddItem);

  lodash.map(claimPayableListEntries, (item: any) => {
    let mapPayable = false;

    if (
      item[1].calculateByPolicyYear === CalculateByPolicyYear.F ||
      item[1].calculateByPolicyYear === CalculateByPolicyYear.Y
    ) {
      const policyYearRule =
        item[1].policyYear === editPayable.policyYear ||
        (item[1].policyYear >= 2 && editPayable.policyYear >= 2);

      mapPayable =
        item[1].incidentId === editPayable.incidentId &&
        item[1].policyNo === editPayable.policyNo &&
        item[1].productCode === editPayable.productCode &&
        item[1].benefitTypeCode === editPayable.benefitTypeCode &&
        policyYearRule;
    } else {
      mapPayable =
        item[1].incidentId === editPayable.incidentId &&
        item[1].policyNo === editPayable.policyNo &&
        item[1].productCode === editPayable.productCode &&
        item[1].benefitTypeCode === editPayable.benefitTypeCode;
    }
    if (mapPayable) {
      incidentPayableArray.push(item[1]);
    }
  });
  // 如果当前的保单过滤后只有一条incidentPayable数据
  if (incidentPayableArray && incidentPayableArray.length === 1) {
    const currentIncidentPayableItem = incidentPayableArray[0];
    lodash.map(currentIncidentPayableItem.treatmentPayableList, (itemId) => {
      const treatmentPayableItem = newClaimEntities.treatmentPayableListMap[itemId];
      const incidentPayableItem =
        newClaimEntities.claimPayableListMap[treatmentPayableItem.payableId];
      treatmentPayableItem.benefitCategory = incidentPayableItem?.benefitCategory;
    });

    newTreatmentPayableAddItem.payableId = currentIncidentPayableItem.id;
    newTreatmentPayableAddItem.benefitCategory = currentIncidentPayableItem.benefitCategory;
    newTreatmentPayableAddItem.benefitAmount = 0;

    newClaimEntities.claimPayableListMap[currentIncidentPayableItem.id].treatmentPayableList = [
      ...(newClaimEntities.claimPayableListMap[currentIncidentPayableItem.id]
        .treatmentPayableList || []),
      newTreatmentPayableAddItem.id,
    ];
    newClaimEntities.treatmentPayableListMap[
      newTreatmentPayableAddItem.id
    ] = newTreatmentPayableAddItem;
    newTreatmentPayableAddItem = null;
  }

  const nextState = produce(state, (draftState) => {
    draftState.claimEntities = newClaimEntities;
    draftState.treatmentPayableAddItem = newTreatmentPayableAddItem;
  });

  return { ...nextState };
};

export default saveTreatmentPayableAddItemCallback;
