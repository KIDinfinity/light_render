import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { ITreatmentPayable } from '@/dtos/claim';
import { filterByKeysAll } from '../functions/fnObject';
import { subtract } from '@/utils/precisionUtils';

const checkBenefitPayables = (benefitPayables: string[], benefitPayableMap: any): boolean => {
  if (lodash.isEmpty(benefitPayables)) {
    return true;
  }
  const filterKeys = [
    'calculationAmount',
    'systemCalculationAmount',
    'uncoverAmount',
    'benefitItemCode',
    'payableDays',
    'insurerCoInsuranceAmount',
    'assessorOverrideAmount',
  ];
  return lodash.every(benefitPayables, (item: string) =>
    lodash.isEmpty(
      lodash.compact(lodash.values(filterByKeysAll(benefitPayableMap[item], filterKeys)))
    )
  );
};

const saveClaimPayableItemCallback = (state: any, action: any) => {
  const { changedFields, incidentPayableId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const fieldkeys = Object.keys(changedFields);
    if (fieldkeys.length === 1) {
      if (lodash.has(changedFields, 'claimDecision')) {
        const tempClaimEntities = draftState.claimEntities;
        const claimPayableItem = formUtils.cleanValidateData(
          tempClaimEntities.claimPayableListMap[incidentPayableId]
        );
        const claimDecision = formUtils.queryValue(changedFields.claimDecision);
        const treatmentPayableMap = tempClaimEntities.treatmentPayableListMap;
        const treatmentPayableList: any[] = lodash.values(treatmentPayableMap);
        if (claimPayableItem.benefitCategory === 'R') {
          const benefitPayableMap = formUtils.cleanValidateData(
            tempClaimEntities.benefitItemPayableListMap
          );
          const benefitPayableEntries: any[] = lodash.entries(benefitPayableMap);
          // for reimbursement, if invoice payable has benefit item, then change override amount of all benefit items to be 0 and disabled
          lodash.forEach(benefitPayableEntries, (item: any) => {
            if (item[1].payableId === incidentPayableId) {
              if (claimDecision === 'D') {
                item[1].payableAmount = 0;
                item[1].assessorOverrideAmount = 0;
              } else {
                item[1].payableAmount = item[1].systemCalculationAmount;
                item[1].assessorOverrideAmount = null;
              }
              if (lodash.isNumber(item[1].calculationAmount)) {
                item[1].uncoverAmount = subtract(item[1].calculationAmount, item[1].payableAmount);
              }
              tempClaimEntities.benefitItemPayableListMap[item[0]] = item[1];
            }
          });
          const invoicePayableMap = tempClaimEntities.invoicePayableListMap;
          const invoicePayableEntries: any[] = formUtils.cleanValidateData(
            lodash.entries(invoicePayableMap)
          );

          if (claimDecision === 'D') {
            // for reimbursement, if invoice payable has no any benefit item, then delete invoice payable record.
            lodash.forEach(invoicePayableEntries, (item: any) => {
              if (
                item[1].payableId === incidentPayableId &&
                checkBenefitPayables(item[1].benefitItemPayableList, benefitPayableMap)
              ) {
                item[1].is_delete = true;
                tempClaimEntities.invoicePayableListMap[item[0]] = item[1];
              }
            });
          } else if (claimDecision === 'A') {
            lodash.forEach(invoicePayableEntries, (item: any) => {
              if (
                item[1].payableId === incidentPayableId &&
                checkBenefitPayables(item[1].benefitItemPayableList, benefitPayableMap)
              ) {
                item[1].is_delete = false;
                tempClaimEntities.invoicePayableListMap[item[0]] = item[1];
              }
            });
          }
          tempClaimEntities.claimPayableListMap[incidentPayableId] = claimPayableItem;
          draftState.claimEntities = tempClaimEntities;
        } else if (claimPayableItem.benefitCategory === 'C') {
          // for allowance, change treatment payable override amount to be 0 and disabled.
          if (claimDecision === 'D') {
            const temps: ITreatmentPayable[] = treatmentPayableList.filter(
              (item: ITreatmentPayable) => item.payableId === incidentPayableId
            );
            const temp = formUtils.cleanValidateData(temps[0]);
            temp.assessorOverrideAmount = 0;
            temp.payableAmount = 0;
            draftState.claimEntities.treatmentPayableListMap[temp.id] = temp;
          }
        }
      }
    }
  });

  return { ...nextState };
};

export default saveClaimPayableItemCallback;
