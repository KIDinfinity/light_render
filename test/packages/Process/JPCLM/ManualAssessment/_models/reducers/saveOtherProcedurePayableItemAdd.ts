import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';

const saveOtherProcedurePayableItemAdd = (state: any, action: any) => {
  const { claimEntities, otherProcedurePayableItemAdd } = state;
  const { changedFields } = action.payload;
  const newOtherProcedurePayableAddItem = { ...otherProcedurePayableItemAdd, ...changedFields };
  const otheprocedurePayableAddItemValue = formUtils.cleanValidateData(
    newOtherProcedurePayableAddItem
  );

  const fieldsArray = Object.entries(changedFields);

  if (fieldsArray.length === 1) {
    const treatmentPyableListEntries = Object.entries(
      formUtils.cleanValidateData(claimEntities.treatmentPayableListMap)
    );
    const treatmentPayableArray: any = [];
    if (lodash.has(changedFields, 'policyNo')) {
      lodash.map(treatmentPyableListEntries, (item: any) => {
        if (
          item[1].treatmentId === otheprocedurePayableAddItemValue.treatmentId &&
          item[1].policyNo === otheprocedurePayableAddItemValue.policyNo &&
          claimEntities.claimPayableListMap[item[1]?.payableId].benefitCategory ===
            eBenefitCategory.T
        ) {
          treatmentPayableArray.push(item[1]);
        }
      });
      if (treatmentPayableArray && treatmentPayableArray.length === 1) {
        const treatmentPayableItem = treatmentPayableArray[0];
        // 赋值必须以这种形式
        newOtherProcedurePayableAddItem.productCode = {
          touched: true,
          name: 'productCode',
          value: treatmentPayableItem.productCode,
          errors: undefined,
        };
        newOtherProcedurePayableAddItem.benefitTypeCode = {
          touched: true,
          name: 'benefitTypeCode',
          value: treatmentPayableItem.benefitTypeCode,
          errors: undefined,
        };
      } else {
        newOtherProcedurePayableAddItem.productCode = null;
        newOtherProcedurePayableAddItem.benefitTypeCode = null;
        newOtherProcedurePayableAddItem.benefitItemCode = null;
      }
    }
    // 修改产品
    if (lodash.has(changedFields, 'productCode')) {
      lodash.map(treatmentPyableListEntries, (item: any) => {
        if (
          item[1].incidentId === otheprocedurePayableAddItemValue.incidentId &&
          item[1].policyNo === otheprocedurePayableAddItemValue.policyNo &&
          item[1].productCode === otheprocedurePayableAddItemValue.productCode &&
          claimEntities.claimPayableListMap[item[1]?.payableId].benefitCategory ===
            eBenefitCategory.T
        ) {
          treatmentPayableArray.push(item[1]);
        }
      });

      if (treatmentPayableArray && treatmentPayableArray.length === 1) {
        const treatmentPayableItem = treatmentPayableArray[0];
        // 赋值必须以这种形式
        newOtherProcedurePayableAddItem.benefitTypeCode = {
          touched: true,
          name: 'benefitTypeCode',
          value: treatmentPayableItem.benefitTypeCode,
          errors: undefined,
        };
      } else {
        newOtherProcedurePayableAddItem.benefitTypeCode = null;
        newOtherProcedurePayableAddItem.benefitItemCode = null;
      }
    }
  }
  const nextState = produce(state, (draftState: any) => {
    const draft = draftState;
    draft.otherProcedurePayableItemAdd = newOtherProcedurePayableAddItem;
  });
  return { ...nextState };
};

export default saveOtherProcedurePayableItemAdd;
