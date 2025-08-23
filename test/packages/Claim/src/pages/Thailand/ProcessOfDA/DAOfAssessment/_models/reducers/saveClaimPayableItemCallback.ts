import { produce } from 'immer';
import lodash, { pick, set, has } from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { ITreatmentPayable } from '@/dtos/claim';
import { BenefitCategory as BC } from '@/dtos/BenefitCategory';
import { getMappingPolicy } from '../functions/utils';
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
    lodash.isEmpty(lodash.compact(lodash.values(pick(benefitPayableMap[item], filterKeys))))
  );
};

/**
 * 更新benefit payable的payableAmount以及assessorOverrideAmount的值，决定在UI层是否重置这两个值是否为0
 * @param tempClaimEntities
 * @param incidentPayableId
 * @param useZero
 */
const updateBenefitPayable = (
  tempClaimEntities: any,
  incidentPayableId: string,
  useZero: boolean
) => {
  const benefitPayableMap = formUtils.cleanValidateData(
    tempClaimEntities.benefitItemPayableListMap
  );
  const benefitPayableEntries: any[] = lodash.entries(benefitPayableMap);
  lodash.forEach(benefitPayableEntries, (item: any) => {
    if (item[1].payableId === incidentPayableId) {
      item[1].payableAmount = useZero ? 0 : item[1].systemCalculationAmount;
      // item[1].assessorOverrideAmount = useZero ? 0 : null;
      item[1].assessorOverrideAmount = null;
      if (lodash.isNumber(item[1].calculationAmount)) {
        item[1].uncoverAmount = subtract(item[1].calculationAmount, item[1].payableAmount);
        item[1].uncoverAmount = item[1].uncoverAmount > 0 ? item[1].uncoverAmount : 0;
      }
      tempClaimEntities.benefitItemPayableListMap[item[0]] = item[1];
    }
  });
};

/**
 * 更新invoice payable的is_delete的值，决定在UI层是否展现invoice payable
 * @param tempClaimEntities
 * @param incidentPayableId
 * @param isDelete
 */
const updateinvoicePayable = (
  tempClaimEntities: any,
  incidentPayableId: string,
  isDelete: boolean
) => {
  const benefitPayableMap = formUtils.cleanValidateData(
    tempClaimEntities.benefitItemPayableListMap
  );
  const invoicePayableMap = tempClaimEntities.invoicePayableListMap;
  const invoicePayableEntries: any[] = formUtils.cleanValidateData(
    lodash.entries(invoicePayableMap)
  );
  lodash.forEach(invoicePayableEntries, (item: any) => {
    if (
      item[1].payableId === incidentPayableId &&
      checkBenefitPayables(item[1].benefitItemPayableList, benefitPayableMap)
    ) {
      item[1].is_delete = isDelete;
      tempClaimEntities.invoicePayableListMap[item[0]] = item[1];
    }
  });
};

const saveClaimPayableItemCallback = (state: any, action: any) => {
  const { changedFields, incidentPayableId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const fieldkeys = Object.keys(changedFields);
    if (fieldkeys.length === 1) {
      if (lodash.has(changedFields, 'claimDecision')) {
        const tempClaimEntities = draftState.claimEntities;
        const claimPayableItem = tempClaimEntities.claimPayableListMap[incidentPayableId];

        const preClaimDecision = formUtils.queryValue(claimPayableItem.preClaimDecision);
        const claimDecision = formUtils.queryValue(changedFields.claimDecision);

        const treatmentPayableMap = tempClaimEntities.treatmentPayableListMap;
        const treatmentPayableList: any[] = lodash.values(treatmentPayableMap);

        const accidentBenefitPayableList = lodash.filter(
          lodash.get(draftState, 'claimEntities.accidentBenefitPayableListMap'),
          (item) => item.payableId === incidentPayableId
        );

        const benefitTypeCode = formUtils.queryValue(claimPayableItem.benefitTypeCode);
        const hasBenefitTypeCodeErrors = has(claimPayableItem, 'benefitTypeCode.errors');
        /**
         * 需求：根据当前选择decision和之前选择的decision值分别处理benefit category各种类型下的数据
         */

        if (claimDecision === 'D' && preClaimDecision !== 'D') {
          // 当前选择deny且前面选择的不是deny
          switch (claimPayableItem.benefitCategory) {
            case BC.R:
              // for reimbursement, if invoice payable has benefit item, then change override amount of all benefit items to be 0 and disabled
              updateBenefitPayable(tempClaimEntities, incidentPayableId, true);

              // for reimbursement, if invoice payable has no any benefit item, then delete invoice payable record.
              updateinvoicePayable(tempClaimEntities, incidentPayableId, true);

              break;
            case BC.A:
              lodash.forEach(accidentBenefitPayableList, (item) => {
                item.assessorOverrideAmount = null;
                item.payableAmount = 0;
              });
              break;
            case BC.C:
              // for allowance, change treatment payable override amount to be 0 and disabled.
              const temps: ITreatmentPayable[] = treatmentPayableList.filter(
                (item: ITreatmentPayable) => item.payableId === incidentPayableId
              );
              const temp = formUtils.cleanValidateData(temps[0]);
              temp.assessorOverrideAmount = null;
              temp.payableAmount = 0;
              draftState.claimEntities.treatmentPayableListMap[temp.id] = temp;
              break;
            default:
              break;
          }
          if (hasBenefitTypeCodeErrors) set(claimPayableItem, 'benefitTypeCode.errors', undefined);
        } else if (claimDecision !== 'D' && preClaimDecision === 'D') {
          const errors = [
            {
              message: 'Required!',
              field: 'benefitTypeCode',
            },
          ];
          if (hasBenefitTypeCodeErrors) {
            if (benefitTypeCode) {
              set(claimPayableItem, 'benefitTypeCode.errors', undefined);
            } else {
              set(claimPayableItem, 'benefitTypeCode.errors', errors);
            }
          }
          const temps: ITreatmentPayable[] = treatmentPayableList.filter(
            (item: ITreatmentPayable) => item.payableId === incidentPayableId
          );
          const temp = lodash.first(temps);
          const mappingPolicy = getMappingPolicy(claimPayableItem, draftState?.listPolicy);
          switch (claimPayableItem.benefitCategory) {
            case BC.R:
              // for reimbursement, if invoice payable has benefit item, then change override amount of all benefit items to be 0 and disabled
              updateBenefitPayable(tempClaimEntities, incidentPayableId, false);
              if (claimDecision === 'A') {
                updateinvoicePayable(tempClaimEntities, incidentPayableId, false);
              }
              break;
            case BC.A:
              lodash.forEach(accidentBenefitPayableList, (item) => {
                item.payableAmount = item.systemCalculationAmount;
                item.assessorOverrideAmount = null;
              });
              break;
            case BC.C:
              temp.benefitAmount = lodash.get(mappingPolicy, 'sumAssured', 0);
              draftState.claimEntities.treatmentPayableListMap[temp.id] = temp;
              break;
            default:
              break;
          }
        }

        if (claimDecision !== 'D') {
          claimPayableItem.denyCode = '';
        }

        if (claimDecision !== 'D') {
          claimPayableItem.denyCode = '';
        }

        if (claimDecision === 'D' && claimPayableItem.benefitCategory === BC.A) {
          let treatmentId = '';
          const discards = lodash
            .chain(lodash.get(draftState, 'claimEntities.accidentBenefitPayableListMap'))
            .map((item) => {
              if (item.payableId === incidentPayableId) {
                treatmentId = item.treatmentPayableId;
                return item.id;
              }
              return '';
            })
            .compact()
            .value();

          lodash.forEach(discards, (id: any) => {
            delete tempClaimEntities?.accidentBenefitPayableListMap?.[id];
          });
          const newAccidentBenefitPayableList = lodash
            .chain(
              lodash.get(
                tempClaimEntities,
                `treatmentPayableListMap.${treatmentId}.accidentBenefitPayableList`
              )
            )
            .filter((id: string) => !lodash.includes(discards, id))
            .value();
          lodash.set(
            tempClaimEntities,
            `treatmentPayableListMap.${treatmentId}.accidentBenefitPayableList`,
            newAccidentBenefitPayableList
          );
          lodash.set(tempClaimEntities, `treatmentPayableListMap.${treatmentId}.fullyClaim`, false);
        }

        draftState.claimEntities = tempClaimEntities;
      }
    }
  });

  return { ...nextState };
};

export default saveClaimPayableItemCallback;
