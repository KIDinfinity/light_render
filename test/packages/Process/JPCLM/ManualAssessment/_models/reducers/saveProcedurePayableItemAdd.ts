import { produce }  from 'immer';
import lodash from 'lodash';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { formUtils } from 'basic/components/Form';

const saveProcedurePayableItemAdd = (state: any, action: any) => {
  const { claimEntities, procedurePayableItemAdd } = state;
  const { changedFields } = action.payload;
  const newProcedurePayableAddItem = { ...procedurePayableItemAdd, ...changedFields };
  const procedurePayableAddItemValue = formUtils.cleanValidateData(newProcedurePayableAddItem);

  const fieldsArray = Object.entries(changedFields);

  if (fieldsArray.length === 1) {
    const treatmentPyableListEntries = Object.entries(
      formUtils.cleanValidateData(claimEntities.treatmentPayableListMap)
    );
    const treatmentPayableArray: any = [];
    if (lodash.has(changedFields, 'policyNo')) {
      lodash.map(treatmentPyableListEntries, (item: any) => {
        if (
          item[1].treatmentId === procedurePayableAddItemValue.treatmentId &&
          item[1].policyNo === procedurePayableAddItemValue.policyNo &&
          claimEntities.claimPayableListMap[item[1]?.payableId].benefitCategory ===
            eBenefitCategory.S
        ) {
          treatmentPayableArray.push(item[1]);
        }
      });
      if (treatmentPayableArray && treatmentPayableArray.length === 1) {
        const treatmentPayableItem = treatmentPayableArray[0];
        // 赋值必须以这种形式
        newProcedurePayableAddItem.productCode = {
          touched: true,
          name: 'productCode',
          value: treatmentPayableItem.productCode,
          errors: undefined,
        };
        newProcedurePayableAddItem.benefitTypeCode = {
          touched: true,
          name: 'benefitTypeCode',
          value: treatmentPayableItem.benefitTypeCode,
          errors: undefined,
        };
      } else {
        newProcedurePayableAddItem.productCode = null;
        newProcedurePayableAddItem.benefitTypeCode = null;
        newProcedurePayableAddItem.benefitItemCode = null;
      }
    }
    // 修改产品
    if (lodash.has(changedFields, 'productCode')) {
      lodash.map(treatmentPyableListEntries, (item: any) => {
        if (
          item[1].incidentId === procedurePayableAddItemValue.incidentId &&
          item[1].policyNo === procedurePayableAddItemValue.policyNo &&
          item[1].productCode === procedurePayableAddItemValue.productCode &&
          claimEntities.claimPayableListMap[item[1]?.payableId].benefitCategory ===
            eBenefitCategory.S
        ) {
          treatmentPayableArray.push(item[1]);
        }
      });

      if (treatmentPayableArray && treatmentPayableArray.length === 1) {
        const treatmentPayableItem = treatmentPayableArray[0];
        // 赋值必须以这种形式
        newProcedurePayableAddItem.benefitTypeCode = {
          touched: true,
          name: 'benefitTypeCode',
          value: treatmentPayableItem.benefitTypeCode,
          errors: undefined,
        };
      } else {
        newProcedurePayableAddItem.benefitTypeCode = null;
        newProcedurePayableAddItem.benefitItemCode = null;
      }
    }
  }
  const nextState = produce(state, (draftState: any) => {
    const draft = draftState;
    draft.procedurePayableItemAdd = newProcedurePayableAddItem;
  });

  return { ...nextState };
};

export default saveProcedurePayableItemAdd;
