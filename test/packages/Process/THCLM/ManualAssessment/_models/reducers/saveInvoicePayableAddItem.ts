import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const saveInvoicePayableAddItem = (state: any, action: any) => {
  const { claimEntities, invoicePayableAddItem } = state;
  const { changedFields } = action.payload;
  const newInvoicePayableAddItem = { ...invoicePayableAddItem, ...changedFields };
  const invoicePayableAddItemValue = formUtils.cleanValidateData(newInvoicePayableAddItem);

  const fieldsArray = Object.entries(changedFields);
  if (fieldsArray.length === 1) {
    const treatmentPyableListEntries = Object.entries(
      formUtils.cleanValidateData(claimEntities.treatmentPayableListMap)
    );
    const treatmentPayableArray = [];
    if (lodash.has(changedFields, 'policyNo')) {
      lodash.map(treatmentPyableListEntries, (item) => {
        if (
          item[1].treatmentId === invoicePayableAddItemValue.treatmentId &&
          item[1].policyNo === invoicePayableAddItemValue.policyNo
        ) {
          treatmentPayableArray.push(item[1]);
        }
      });
      // 如果当前的保单过滤后只有一条incidentPayable数据
      if (treatmentPayableArray && treatmentPayableArray.length === 1) {
        const treatmentPayableItem = treatmentPayableArray[0];
        // 赋值必须以这种形式
        newInvoicePayableAddItem.productCode = {
          touched: true,
          name: 'productCode',
          value: treatmentPayableItem.productCode,
          errors: undefined,
        };
        newInvoicePayableAddItem.benefitTypeCode = {
          touched: true,
          name: 'benefitTypeCode',
          value: treatmentPayableItem.benefitTypeCode,
          errors: undefined,
        };
      } else {
        newInvoicePayableAddItem.productCode = null;
        newInvoicePayableAddItem.benefitTypeCode = null;
        newInvoicePayableAddItem.benefitItemCode = null;
      }
    }
    // 修改产品
    if (lodash.has(changedFields, 'productCode')) {
      lodash.map(treatmentPyableListEntries, (item) => {
        if (
          item[1].incidentId === invoicePayableAddItemValue.incidentId &&
          item[1].policyNo === invoicePayableAddItemValue.policyNo &&
          item[1].productCode === invoicePayableAddItemValue.productCode
        ) {
          treatmentPayableArray.push(item[1]);
        }
      });

      // 如果当前的保单+产品过滤后只有一条incidentPayable数据
      if (treatmentPayableArray && treatmentPayableArray.length === 1) {
        const treatmentPayableItem = treatmentPayableArray[0];
        // 赋值必须以这种形式
        newInvoicePayableAddItem.benefitTypeCode = {
          touched: true,
          name: 'benefitTypeCode',
          value: treatmentPayableItem.benefitTypeCode,
          errors: undefined,
        };
      } else {
        newInvoicePayableAddItem.benefitTypeCode = null;
        newInvoicePayableAddItem.benefitItemCode = null;
      }
    }
  }

  const nextState = produce(state, (draftState) => {
    draftState.invoicePayableAddItem = newInvoicePayableAddItem;
  });

  return { ...nextState };
};

export default saveInvoicePayableAddItem;
