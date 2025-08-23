import { produce }  from 'immer';
import lodash from 'lodash';

const saveTreatmentPayableAddItem = (state: any, action: any) => {
  const { treatmentPayableAddItem } = state;
  const { changedFields } = action.payload;
  const newTreatmentPayableAddItem = { ...treatmentPayableAddItem, ...changedFields };

  const fieldsArray = Object.entries(changedFields);
  if (fieldsArray.length === 1) {
    if (lodash.has(changedFields, 'policyNo')) {
      newTreatmentPayableAddItem.productCode = null;
      newTreatmentPayableAddItem.benefitTypeCode = null;
      newTreatmentPayableAddItem.benefitItemCode = null;
    }
    // 修改产品
    if (lodash.has(changedFields, 'productCode')) {
      newTreatmentPayableAddItem.benefitTypeCode = null;
      newTreatmentPayableAddItem.benefitItemCode = null;
    }
  }

  const nextState = produce(state, (draftState) => {
    draftState.treatmentPayableAddItem = newTreatmentPayableAddItem;
  });

  return { ...nextState };
};

export default saveTreatmentPayableAddItem;
