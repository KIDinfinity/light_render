import { produce } from 'immer';
import lodash, { some, isEmpty, forEach } from 'lodash';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { formUtils } from 'basic/components/Form';
import { cleanFieldsMeta } from 'claim/pages/utils/formUtils';
import Ienum from 'claim/enum';
import { complementClaimPayableItem } from '../functions/complementClaimPayableItem';
import clearClaimPayableItem from '../functions/clearClaimPayableItem';
import validateClaimDecision from './validateClaimDecision';
import { BenefitCategory, ClaimDecision } from '../dto';
import {
  getMappingPolicyData,
  newPayableBoolean,
  validatePayableDuplicate,
} from '../functions/utils';

const saveClaimPayableItem = (state: any, action: any) => {
  const { listPolicy, benefitTypeManualAddMap } = state;
  const { changedFields, incidentPayableId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const { claimProcessData } = draftState;
    let newClaimEntities = draftState.claimEntities;
    const incidentPayableItem = newClaimEntities.claimPayableListMap[incidentPayableId];
    const { treatmentPayableList } = newClaimEntities.claimPayableListMap[incidentPayableId];
    const { claimDecision } = incidentPayableItem;
    let editPayableItem = {
      ...incidentPayableItem,
      ...changedFields,
      preClaimDecision: formUtils.queryValue(claimDecision),
      operation:
        incidentPayableItem?.manualAdd === SwitchEnum.YES ? Ienum.Operation.A : Ienum.Operation.M,
    };
    const fieldsArray = Object.entries(changedFields);
    if (fieldsArray.length === 1) {
      const [name, { value }] = fieldsArray[0];

      const policyData: any =
        getMappingPolicyData({
          item: editPayableItem,
          listPolicy,
          extraData: ['sumAssured', 'benefitCategory'],
        }) || {};

      if (name === 'policyNo') {
        editPayableItem.productCode = '';
        editPayableItem.benefitTypeCode = '';
        editPayableItem.benefitCategory = '';
        editPayableItem.lifePayable = null;
        clearClaimPayableItem(editPayableItem, newClaimEntities);
      }
      // 修改产品
      if (name === 'benefitTypeCode') {
        editPayableItem.productCode = '';
        editPayableItem.benefitCategory = '';
        editPayableItem.lifePayable = null;
        const benefitCode = changedFields?.benefitItemCode?.value;
        if (lodash.isObject(benefitTypeManualAddMap) && benefitTypeManualAddMap) {
          editPayableItem.manualAdd =
            benefitTypeManualAddMap[benefitCode] === null ? null : SwitchEnum.YES;
        }
        clearClaimPayableItem(editPayableItem, newClaimEntities);
        // incidentDecisions唯一性校验
        if (!validatePayableDuplicate(editPayableItem, newClaimEntities.claimPayableListMap)) {
          // 过滤当前选中的保单

          editPayableItem = {
            ...editPayableItem,
            ...policyData,
          };

          // 选择保单、产品、benefitTypeCode后补全当前claimPayableListItem
          const result = complementClaimPayableItem(
            editPayableItem,
            newClaimEntities,
            editPayableItem.sumAssured
          );
          editPayableItem = result.editClaimPayableListItem;
          newClaimEntities = result.editClaimEntities;
        }
      }
      if (
        name === 'assessorOverrideAmount' &&
        lodash.isNumber(changedFields.assessorOverrideAmount.value)
      ) {
        const payableAmount = formUtils.queryValue(editPayableItem.assessorOverrideAmount);

        if (
          editPayableItem.benefitCategory === BenefitCategory.life &&
          editPayableItem.lifePayable
        ) {
          if (payableAmount || lodash.isNumber(payableAmount)) {
            editPayableItem.payableAmount = payableAmount;
            editPayableItem.lifePayable.payableAmount = payableAmount;
            editPayableItem.lifePayable.assessorOverrideAmount = payableAmount;
          }
        }
      }
      if (
        name === 'claimDecision' &&
        changedFields.claimDecision.value !== ClaimDecision.deny &&
        formUtils.queryValue(lodash.get(editPayableItem, 'preClaimDecision')) === ClaimDecision.deny
      ) {
        if (newPayableBoolean(editPayableItem, newClaimEntities, incidentPayableId)) {
          const result = complementClaimPayableItem(
            editPayableItem,
            newClaimEntities,
            policyData.sumAssured
          );
          editPayableItem = result.editClaimPayableListItem;
          newClaimEntities = result.editClaimEntities;
        }
      }

      if (name === 'claimDecision') {
        if (value === ClaimDecision.deny) {
          editPayableItem.systemCalculationAmount = 0;
          editPayableItem.assessorOverrideAmount = null;
          editPayableItem.deductibleNetExpense = null;
          editPayableItem.deductibleOtherInsurerDeduction = null;
          editPayableItem.payableAmount = 0;
          if (!isEmpty(editPayableItem.lifePayable)) {
            editPayableItem.lifePayable.payableAmount = 0;
          }
          forEach(treatmentPayableList, (treatmentPayableId) => {
            const treatmentPayable = newClaimEntities.treatmentPayableListMap[treatmentPayableId];
            treatmentPayable.systemCalculationAmount = 0;
            treatmentPayable.assessorOverrideAmount = null;
            treatmentPayable.deductibleNetExpense = null;
            treatmentPayable.deductibleOtherInsurerDeduction = null;
            treatmentPayable.payableAmount = 0;
            treatmentPayable.payableDays = null;
            newClaimEntities.treatmentPayableListMap[treatmentPayableId] = treatmentPayable;

            const { invoicePayableList } = treatmentPayable;

            forEach(invoicePayableList, (invoicePayableId) => {
              const invoicePayableItem = newClaimEntities.invoicePayableListMap[invoicePayableId];
              invoicePayableItem.systemCalculationAmount = 0;
              invoicePayableItem.assessorOverrideAmount = null;
              invoicePayableItem.deductibleNetExpense = null;
              invoicePayableItem.deductibleOtherInsurerDeduction = null;
              invoicePayableItem.payableAmount = 0;
              newClaimEntities.invoicePayableListMap[invoicePayableId] = invoicePayableItem;

              const { benefitItemPayableList } = invoicePayableItem;

              forEach(benefitItemPayableList, (benefitItemId) => {
                const benefitPayableItem =
                  newClaimEntities.benefitItemPayableListMap[benefitItemId];
                benefitPayableItem.systemCalculationAmount = 0;
                benefitPayableItem.assessorOverrideAmount = null;
                benefitPayableItem.deductibleNetExpense = null;
                benefitPayableItem.deductibleOtherInsurerDeduction = null;
                benefitPayableItem.payableAmount = 0;
                benefitPayableItem.payableDays = null;
              });
            });
          });
        }
        const claimPayableListMapValue = cleanFieldsMeta(
          draftState.claimEntities.claimPayableListMap
        );
        claimPayableListMapValue[incidentPayableId].claimDecision = value;

        const existPending = some(
          claimPayableListMapValue,
          (payableItem) => payableItem.claimDecision === ClaimDecision.pending
        )

        const existApprove = some(
          claimPayableListMapValue,
          (payableItem) => payableItem.claimDecision === ClaimDecision.approve
        );
        const decision = existPending? ClaimDecision.pending : existApprove ? ClaimDecision.approve : ClaimDecision.deny;

        draftState.claimProcessData.claimDecision = {
          ...claimProcessData.claimDecision,
          assessmentDecision: decision,
        };
      }

      if (name == 'extendLimit' && value == 1) {
        editPayableItem.operation = Ienum.Operation.E;
      }
    }

    newClaimEntities.claimPayableListMap[incidentPayableId] = editPayableItem;
    draftState.claimEntities = newClaimEntities;
  });

  let finalState = nextState;
  if (lodash.has(changedFields, 'claimDecision')) {
    finalState = validateClaimDecision(nextState);
  }

  return { ...finalState };
};

export default saveClaimPayableItem;
