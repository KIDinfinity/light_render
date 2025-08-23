import { produce } from 'immer';
import lodash, { get, isEmpty, forEach } from 'lodash';
import { formUtils } from 'basic/components/Form';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { complementClaimPayableItem } from '../functions/complementClaimPayableItem';
import { cleanFieldsMeta } from 'claim/pages/utils/formUtils';
import clearClaimPayableItem from '../functions/clearClaimPayableItem';

const saveClaimPayableItem = (state: any, action: any) => {
  const { listPolicy } = state;
  const { changedFields, incidentPayableId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const { claimProcessData } = draftState;
    let newClaimEntities = draftState.claimEntities;
    const incidentPayableItem = newClaimEntities.claimPayableListMap[incidentPayableId];
    const { treatmentPayableList } = newClaimEntities.claimPayableListMap[incidentPayableId];
    let editPayableItem = { ...incidentPayableItem, ...changedFields };
    const fieldsArray = Object.entries(changedFields);

    if (fieldsArray.length === 1) {
      const [name, { dirty, value }] = fieldsArray[0];
      if (name === 'policyNo' && !dirty) {
        editPayableItem.productCode = '';
        editPayableItem.benefitTypeCode = '';
        editPayableItem.benefitCategory = '';
        editPayableItem.lifePayable = null;
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
          (payableItem) =>
            payableItem[1].incidentId === editPayable.incidentId &&
            payableItem[1].policyNo === editPayable.policyNo &&
            payableItem[1].productCode === editPayable.productCode &&
            payableItem[1].benefitTypeCode === editPayable.benefitTypeCode
        );

        if (payable.length === 0) {
          // 过滤当前选中的保单
          const mappingPolicy = lodash.find(
            listPolicy,
            (item) =>
              item.policyNo === editPayable.policyNo &&
              item.coreProductCode === editPayable.productCode &&
              item.benefitTypeCode === editPayable.benefitTypeCode
          );
          editPayableItem.benefitCategory = get(mappingPolicy, 'benefitCategory');
          editPayableItem.coverageKey = get(mappingPolicy, 'coverageKey');
          // 选择保单、产品、benefitTypeCode后补全当前claimPayableListItem
          const result = complementClaimPayableItem(editPayableItem, newClaimEntities);
          editPayableItem = result.editClaimPayableListItem;
          newClaimEntities = result.editClaimEntities;
        }
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
        const claimPayableListMapValue = cleanFieldsMeta(newClaimEntities.claimPayableListMap);
        claimPayableListMapValue[incidentPayableId].claimDecision = value;
        const existApproveOrExgratia = lodash.some(
          claimPayableListMapValue,
          (payableItem) =>
            payableItem.claimDecision === ClaimDecision.approve ||
            payableItem.claimDecision === ClaimDecision.exGratia
        );
        const claimDecision = existApproveOrExgratia ? ClaimDecision.approve : ClaimDecision.deny;
        draftState.claimProcessData.claimDecision = {
          ...claimProcessData.claimDecision,
          assessmentDecision: claimDecision,
        };
      }
    }
    newClaimEntities.claimPayableListMap[incidentPayableId] = editPayableItem;
    draftState.claimEntities = newClaimEntities;
  });
  return { ...nextState };
};

export default saveClaimPayableItem;
