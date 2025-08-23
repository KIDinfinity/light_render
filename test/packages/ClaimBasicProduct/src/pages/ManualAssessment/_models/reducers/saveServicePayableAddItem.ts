import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const saveServicePayableAddItem = (state: any, action: any) => {
  const { claimEntities, servicePayableAddItem } = state;
  const { changedFields } = action.payload;
  const newServicePayableAddItem = { ...servicePayableAddItem, ...changedFields };
  const servicePayableAddItemValue = formUtils.cleanValidateData(newServicePayableAddItem);

  const fieldsArray = Object.entries(changedFields);
  if (fieldsArray.length === 1) {
    const invoicePyableListEntries = Object.entries(
      formUtils.cleanValidateData(claimEntities.invoicePayableListMap)
    );
    const invoicePayableArray = [];
    if (lodash.has(changedFields, 'policyNo')) {
      lodash.map(invoicePyableListEntries, (item) => {
        if (
          item[1].invoiceId === servicePayableAddItemValue.invoiceId &&
          item[1].policyNo === servicePayableAddItemValue.policyNo
        ) {
          invoicePayableArray.push(item[1]);
        }
      });
      // 如果当前的保单过滤后只有一条invoicePayable数据
      if (invoicePayableArray && invoicePayableArray.length === 1) {
        const invoicePayableItem = invoicePayableArray[0];
        // 赋值必须以这种形式
        newServicePayableAddItem.productCode = {
          touched: true,
          name: 'productCode',
          value: invoicePayableItem.productCode,
          errors: undefined,
        };
        newServicePayableAddItem.benefitTypeCode = {
          touched: true,
          name: 'benefitTypeCode',
          value: invoicePayableItem.benefitTypeCode,
          errors: undefined,
        };
      } else {
        newServicePayableAddItem.productCode = null;
        newServicePayableAddItem.benefitTypeCode = null;
        newServicePayableAddItem.benefitItemCode = null;
      }
    }
    // 修改产品
    if (lodash.has(changedFields, 'productCode')) {
      lodash.map(invoicePyableListEntries, (item) => {
        if (
          item[1].invoiceId === servicePayableAddItemValue.invoiceId &&
          item[1].policyNo === servicePayableAddItemValue.policyNo &&
          item[1].productCode === servicePayableAddItemValue.productCode
        ) {
          invoicePayableArray.push(item[1]);
        }
      });

      // 如果当前的保单+产品过滤后只有一条incidentPayable数据
      if (invoicePayableArray && invoicePayableArray.length === 1) {
        const invoicePayableItem = invoicePayableArray[0];
        // 赋值必须以这种形式
        newServicePayableAddItem.benefitTypeCode = {
          touched: true,
          name: 'benefitTypeCode',
          value: invoicePayableItem.benefitTypeCode,
          errors: undefined,
        };
      } else {
        newServicePayableAddItem.benefitTypeCode = null;
        newServicePayableAddItem.benefitItemCode = null;
      }
    }
  }

  const nextState = produce(state, (draftState) => {
    draftState.servicePayableAddItem = newServicePayableAddItem;
  });

  return { ...nextState };
};

export default saveServicePayableAddItem;
