import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const saveTreatmentPayableAddItem = (state: any, action: any) => {
  const { claimEntities, treatmentPayableAddItem } = state;
  const { changedFields } = action.payload;
  const newTreatmentPayableAddItem = { ...treatmentPayableAddItem, ...changedFields };
  const treatmentPayableAddItemValue = formUtils.cleanValidateData(newTreatmentPayableAddItem);

  const fieldsArray = Object.entries(changedFields);
  if (fieldsArray.length === 1) {
    const claimPayableListEntries = Object.entries(
      formUtils.cleanValidateData(claimEntities.claimPayableListMap)
    );
    const incidentPayableArray = [];
    if (lodash.has(changedFields, 'policyNo')) {
      lodash.map(claimPayableListEntries, (item) => {
        if (
          item[1].incidentId === treatmentPayableAddItemValue.incidentId &&
          item[1].policyNo === treatmentPayableAddItemValue.policyNo
        ) {
          incidentPayableArray.push(item[1]);
        }
      });
      // 如果当前的保单过滤后只有一条incidentPayable数据
      if (incidentPayableArray && incidentPayableArray.length === 1) {
        const incidentPayableItem = incidentPayableArray[0];
        newTreatmentPayableAddItem.productCode = {
          touched: true,
          name: 'productCode',
          value: incidentPayableItem.productCode,
          errors: undefined,
        };
        newTreatmentPayableAddItem.benefitTypeCode = {
          touched: true,
          name: 'benefitTypeCode',
          value: incidentPayableItem.benefitTypeCode,
          errors: undefined,
        };
      } else {
        newTreatmentPayableAddItem.productCode = null;
        newTreatmentPayableAddItem.benefitTypeCode = null;
        newTreatmentPayableAddItem.benefitItemCode = null;
      }
    }
    // 修改产品
    if (lodash.has(changedFields, 'productCode')) {
      lodash.map(claimPayableListEntries, (item) => {
        if (
          item[1].incidentId === treatmentPayableAddItemValue.incidentId &&
          item[1].policyNo === treatmentPayableAddItemValue.policyNo &&
          item[1].productCode === treatmentPayableAddItemValue.productCode
        ) {
          incidentPayableArray.push(item[1]);
        }
      });

      // 如果当前的保单+产品过滤后只有一条incidentPayable数据
      if (incidentPayableArray && incidentPayableArray.length === 1) {
        const incidentPayableItem = incidentPayableArray[0];
        newTreatmentPayableAddItem.benefitTypeCode = {
          touched: true,
          name: 'benefitTypeCode',
          value: incidentPayableItem.benefitTypeCode,
          errors: undefined,
        };
      } else {
        newTreatmentPayableAddItem.benefitTypeCode = null;
        newTreatmentPayableAddItem.benefitItemCode = null;
      }
    }
  }

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    draftState.treatmentPayableAddItem = newTreatmentPayableAddItem;
  });

  return { ...nextState };
};

export default saveTreatmentPayableAddItem;
