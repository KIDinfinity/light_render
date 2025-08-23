import { produce }  from 'immer';
import lodash, { get, isEmpty, forEach } from 'lodash';
import { formUtils } from 'basic/components/Form';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { cleanFieldsMeta } from 'claim/pages/utils/formUtils';
import { DenyCode } from 'claim/pages/Enum';
import { filterDuplicatePayable } from 'claim/pages/utils/filterDuplicatePayable';
import { complementClaimPayableItem } from '../functions/complementClaimPayableItem';
import clearClaimPayableItem from '../functions/clearClaimPayableItem';

const saveClaimPayableItem = (state: any, action: any) => {
  const { listPolicy } = state;
  const { changedFields, incidentPayableId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const { saveExchangeRateForInvoice } = draftState;
    const exchangeRateList = saveExchangeRateForInvoice;
    let newClaimEntities = draftState.claimEntities;
    const incidentPayableItem = newClaimEntities.claimPayableListMap[incidentPayableId];
    const preBenefitTypeCode = formUtils.queryValue(
      lodash.get(incidentPayableItem, 'benefitTypeCode')
    );
    const { treatmentPayableList } = newClaimEntities.claimPayableListMap[incidentPayableId];
    let editPayableItem = { ...incidentPayableItem, ...changedFields };
    const fieldsArray = Object.entries(changedFields);
    if (fieldsArray.length === 1) {
      const [name, { dirty, value }] = fieldsArray[0];
      if (name === 'policyNo' && !dirty) {
        const policyCurrency = lodash.find(listPolicy, (item) => item.policyNo === value)
          ?.policyCurrency;
        editPayableItem.policyCurrency = policyCurrency;
        editPayableItem.productCode = '';
        editPayableItem.benefitTypeCode = '';
        editPayableItem.benefitCategory = '';
        editPayableItem.lifePayable = null;
        editPayableItem.assessorOverrideAmount = null;
        clearClaimPayableItem(editPayableItem, newClaimEntities);
      }
      // 修改产品
      if (name === 'productCode' && !dirty) {
        editPayableItem.benefitTypeCode = '';
        editPayableItem.benefitCategory = '';
        editPayableItem.lifePayable = null;
        clearClaimPayableItem(editPayableItem, newClaimEntities);
      }
      // 修改给付责任
      if (name === 'benefitTypeCode' && !dirty) {
        editPayableItem.lifePayable = null;
        clearClaimPayableItem(editPayableItem, newClaimEntities);
        // incidentDecisions唯一性校验
        const editPayable = formUtils.cleanValidateData(editPayableItem);
        const preClaimPayableList = formUtils.cleanValidateData(
          newClaimEntities.claimPayableListMap
        );
        const claimPayableListEntries = Object.entries(preClaimPayableList);

        const payable = lodash.filter(
          claimPayableListEntries,
          (payableItem: any) =>
            payableItem[1].incidentId === editPayable.incidentId &&
            filterDuplicatePayable(payableItem[1], editPayable)
        );

        if (payable.length === 0) {
          const mappingPolicy = lodash.find(
            listPolicy,
            (item) =>
              item.policyNo === editPayable.policyNo &&
              item.coreProductCode === editPayable.productCode &&
              item.benefitTypeCode === editPayable.benefitTypeCode
          );
          editPayableItem.benefitCategory = get(mappingPolicy, 'benefitCategory');
          // 过滤当前选中的保单
          editPayableItem.coverageKey = get(mappingPolicy, 'coverageKey');
          // 选择保单、产品、benefitTypeCode后补全当前claimPayableListItem
          const result = complementClaimPayableItem(
            editPayableItem,
            newClaimEntities,
            exchangeRateList
          );
          editPayableItem = result.editClaimPayableListItem;
          newClaimEntities = result.editClaimEntities;
        }
        // submit的时候 duplicate的payable会出现error 当change其中一个payable的时候 需要清空另一个payable的error
        const duplicatePayableList = lodash.filter(
          claimPayableListEntries,
          (payableItem: any) =>
            payableItem[1].incidentId === editPayable.incidentId &&
            filterDuplicatePayable(payableItem[1], {
              ...editPayable,
              benefitTypeCode: preBenefitTypeCode,
            })
        );
        lodash.forEach(duplicatePayableList, (item) => {
          if (lodash.isObject(newClaimEntities.claimPayableListMap[item[0]].benefitTypeCode)) {
            newClaimEntities.claimPayableListMap[item[0]].benefitTypeCode.errors = null;
          }
        });
      }
      if (
        name === 'assessorOverrideAmount' &&
        lodash.isNumber(changedFields.assessorOverrideAmount.value)
      ) {
        const payableAmount = formUtils.queryValue(editPayableItem.assessorOverrideAmount);

        if (editPayableItem.benefitCategory === 'L' && editPayableItem.lifePayable) {
          if (payableAmount || lodash.isNumber(payableAmount)) {
            editPayableItem.payableAmount = payableAmount;
            editPayableItem.lifePayable.payableAmount = payableAmount;
            editPayableItem.lifePayable.assessorOverrideAmount = payableAmount;
          }
        }
      }

      if (name === 'claimDecision') {
        if (value === ClaimDecision.deny) {
          editPayableItem.systemCalculationAmount = 0;
          editPayableItem.assessorOverrideAmount = null;
          editPayableItem.payableAmount = 0;
          editPayableItem.exchangeRatePolicyPayout = 0;
          if (!isEmpty(editPayableItem.lifePayable)) {
            editPayableItem.lifePayable.payableAmount = 0;
          }
          forEach(treatmentPayableList, (treatmentPayableId) => {
            const treatmentPayable = newClaimEntities.treatmentPayableListMap[treatmentPayableId];
            treatmentPayable.systemCalculationAmount = 0;
            treatmentPayable.assessorOverrideAmount = null;
            treatmentPayable.payableAmount = 0;
            treatmentPayable.payableDays = null;
            newClaimEntities.treatmentPayableListMap[treatmentPayableId] = treatmentPayable;

            const { invoicePayableList } = treatmentPayable;

            forEach(invoicePayableList, (invoicePayableId) => {
              const invoicePayableItem = newClaimEntities.invoicePayableListMap[invoicePayableId];
              invoicePayableItem.systemCalculationAmount = 0;
              invoicePayableItem.assessorOverrideAmount = null;
              invoicePayableItem.payableAmount = 0;
              newClaimEntities.invoicePayableListMap[invoicePayableId] = invoicePayableItem;

              const { serviceItemPayableList } = invoicePayableItem;

              forEach(serviceItemPayableList, (servicePayableItemId) => {
                const servicePayableItem =
                  newClaimEntities.serviceItemPayableListMap[servicePayableItemId];
                servicePayableItem.systemCalculationAmount = 0;
                servicePayableItem.assessorOverrideAmount = null;
                servicePayableItem.payableAmount = 0;
                servicePayableItem.payableDays = null;
                servicePayableItem.deductibleAmount = null;
              });
            });
          });
        }
        if (value !== ClaimDecision.exGratia) {
          editPayableItem.exGratiaCode = null;
          editPayableItem.exGratiaReason = null;
        }
        if (value !== ClaimDecision.deny) {
          editPayableItem.denyCode = null;
          editPayableItem.denyReason = null;
        }
        const claimPayableListMapValue = cleanFieldsMeta(newClaimEntities.claimPayableListMap);
        claimPayableListMapValue[incidentPayableId].claimDecision = value;
      }
      if (name === 'denyCode' && value !== DenyCode.Other) {
        editPayableItem.denyReason = null;
      }
    }

    newClaimEntities.claimPayableListMap[incidentPayableId] = editPayableItem;
    draftState.claimEntities = newClaimEntities;
  });
  return { ...nextState };
};

export default saveClaimPayableItem;
