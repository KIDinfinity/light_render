import { produce } from 'immer';
import moment from 'moment';
import lodash, { isEmpty, forEach } from 'lodash';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { cleanFieldsMeta } from 'claim/pages/utils/formUtils';
import { formUtils } from 'basic/components/Form';
import { EPolicySource } from 'claim/enum/EPolicySource';
import { BeyondNEL } from 'claim/enum/BeyondNEL';
import { BenefitCategory } from 'claim/pages/utils/claim';
import { handleBenefitTypeCode, clearClaimPayableItem, setDefPolicyProduct } from '../functions';
import { countPolicyDuration, countContestableClaim } from '../functions/fnObject';

const saveClaimPayableItem = (state: any, action: any) => {
  const { listPolicy } = state;
  const { changedFields, incidentPayableId } = action.payload;

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    const { claimProcessData } = draftState;
    let newClaimEntities = draftState.claimEntities;
    const incidentPayableItem = newClaimEntities.claimPayableListMap[incidentPayableId];
    const incidentId = lodash.get(incidentPayableItem, 'incidentId');
    const incidentDate = lodash.get(newClaimEntities, `incidentListMap.${incidentId}.incidentDate`);
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
        const policyItem = lodash.find(listPolicy, { policyNo: value });
        editPayableItem.policySource = policyItem?.policySource;
        editPayableItem.memberNo = policyItem?.memberNo;
        const { issueEffectiveDate, policySource, beyondNel } = lodash.pick(policyItem, [
          'issueEffectiveDate',
          'policySource',
          'beyondNel',
        ]);
        editPayableItem.beyondNel =
          EPolicySource.Group === policySource && beyondNel === BeyondNEL.YES ? 1 : 0;
        const { year, month } = countPolicyDuration(incidentDate, issueEffectiveDate);
        editPayableItem.policyDurationYears = year;
        editPayableItem.policyDurationMonths = month;
        editPayableItem.contestableClaim = countContestableClaim(incidentDate, issueEffectiveDate);
      }
      // 修改产品
      if (name === 'productCode' && !dirty) {
        editPayableItem.benefitTypeCode = '';
        editPayableItem.benefitCategory = '';
        editPayableItem.lifePayable = null;
        clearClaimPayableItem(editPayableItem, newClaimEntities);
      }
      // 给lifePayable赋值
      if (name === 'benefitItemCode' && editPayableItem.benefitCategory === 'L' && !dirty) {
        lodash.set(editPayableItem, 'lifePayable.benefitItemCode', value);
      }
      // 修改给付责任
      if (name === 'benefitTypeCode' && !dirty) {
        editPayableItem.benefitCategory = '';
        editPayableItem.lifePayable = null;
        const result = handleBenefitTypeCode(editPayableItem, newClaimEntities, listPolicy);
        editPayableItem = result.editClaimPayableListItem;
        newClaimEntities = result.editClaimEntities;
      }
      if (
        name === 'assessorOverrideAmount' &&
        lodash.isNumber(changedFields.assessorOverrideAmount.value)
      ) {
        const payableAmount = formUtils.queryValue(editPayableItem.assessorOverrideAmount);

        if (editPayableItem.benefitCategory === BenefitCategory.life) {
          if (payableAmount || lodash.isNumber(payableAmount)) {
            editPayableItem.payableAmount = payableAmount;
            lodash.set(editPayableItem, 'lifePayable.payableAmount', payableAmount);
            lodash.set(editPayableItem, 'lifePayable.assessorOverrideAmount', payableAmount);
          }
        }
      }

      if (name === 'claimDecision') {
        if (value === ClaimDecision.deny) {
          editPayableItem.systemCalculationAmount = 0;
          editPayableItem.assessorOverrideAmount = null;
          editPayableItem.payableAmount = 0;
          editPayableItem.denyCode = null;
          editPayableItem.denyWithRescission = null;
          editPayableItem.refundBasis = null;
          editPayableItem.claimWithExGratia = null;
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

              const { benefitItemPayableList } = invoicePayableItem;

              forEach(benefitItemPayableList, (benefitPayableItemId) => {
                const benefitPayableItem =
                  newClaimEntities.benefitItemPayableListMap[benefitPayableItemId];
                benefitPayableItem.assessorOverrideAmount = null;
                benefitPayableItem.payableAmount = 0;
              });
            });
          });
        }
        if (value === ClaimDecision.approve) {
          editPayableItem.denyCode = null;
          editPayableItem.denyWithRescission = null;
          editPayableItem.refundBasis = null;
          editPayableItem.claimWithExGratia = null;
        }
        const claimPayableListMapValue = cleanFieldsMeta(newClaimEntities.claimPayableListMap);
        claimPayableListMapValue[incidentPayableId].claimDecision = value;
        const existApprove = lodash.some(
          claimPayableListMapValue,
          (payableItem) => payableItem.claimDecision === ClaimDecision.approve
        );
        const claimDecision = existApprove ? ClaimDecision.approve : ClaimDecision.deny;
        draftState.claimProcessData.claimDecision = {
          ...claimProcessData.claimDecision,
          assessmentDecision: claimDecision,
        };
      }
    }

    //对于C类型的benefit，当payable days没有经过用户调整时，自动根据discharge date和admission date进行计算
    if (editPayableItem.benefitCategory === BenefitCategory.cashless) {
      forEach(treatmentPayableList, (treatmentPayableId) => {
        const treatmentPayable = newClaimEntities.treatmentPayableListMap[treatmentPayableId];
        if (!lodash.isEmpty(treatmentPayable)) {
          const { treatmentId } = treatmentPayable;
          const treatment = newClaimEntities.treatmentListMap[treatmentId];
          const { dateOfAdmission, dateOfDischarge } = treatment;
          const dateDischargeVal = formUtils.queryValue(dateOfDischarge);
          const dateAdmissionVal = formUtils.queryValue(dateOfAdmission);

          if (
            dateDischargeVal &&
            moment(dateDischargeVal).isValid() &&
            dateAdmissionVal &&
            moment(dateAdmissionVal).isValid()
          ) {
            const dateDischarge = moment(dateDischargeVal).dayOfYear();
            const dateAdmission = moment(dateAdmissionVal).dayOfYear();
            treatmentPayable.payableDays = dateDischarge - dateAdmission + 1;

            newClaimEntities.treatmentPayableListMap[treatmentPayableId] = treatmentPayable;
          }
        }
      });
    }

    draftState.claimEntities = newClaimEntities;

    const result: any = setDefPolicyProduct(draftState, {
      claimPayable: editPayableItem,
      changedFields,
    });
    draftState.claimEntities = result.claimEntities;
    draftState.claimEntities.claimPayableListMap[incidentPayableId] = result.claimPayable;
  });
  return { ...nextState };
};

export default saveClaimPayableItem;
