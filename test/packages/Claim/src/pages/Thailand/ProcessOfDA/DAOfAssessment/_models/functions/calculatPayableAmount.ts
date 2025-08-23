import lodash, { isArray, forEach, isNumber, compact } from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { add, subtract } from '@/utils/precisionUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { VLD000230Block } from 'claim/pages/validators/utils';
import { eClaimDecision } from 'claim/enum/claimDecision';
import CaseCategory from 'basic/enum/CaseCategory';
import getBenefitAmount from './getBenefitAmount';
import { ClaimDecision as enumClaimDecision, BenefitCategory as enumBenefitCategory } from '../dto';

const AIPA = enumBenefitCategory.aipa;
const CASHLESS = enumBenefitCategory.cashless;
const REIMBURSEMENT = enumBenefitCategory.reimbursement;

const vldClaimDecision = (payableAmount, value) => {
  const errors = [];
  if (payableAmount === 0 && value === eClaimDecision.approve) {
    errors.push(formatMessageApi({ message: 'ERR_000266' }));
  }
  if (value === 'P') {
    errors.push(formatMessageApi({ message: 'ERR_000199' }));
  }
  return errors.length > 0 ? errors : undefined;
};

function calculatCashLess(claimPayableItem, claimEntities) {
  const { treatmentPayableList, benefitCategory } = claimPayableItem;
  const { treatmentPayableListMap } = claimEntities;
  if (benefitCategory === CASHLESS && isArray(treatmentPayableList)) {
    let totalTreatmentPayableAmount: number = 0;
    let totalAssessorOverrideAmount: number | null = null;
    forEach(treatmentPayableList, (treatmentPayableItemId) => {
      const treatmentPayableItem = treatmentPayableListMap[treatmentPayableItemId];
      const assessorOverrideAmount = formUtils.queryValue(
        treatmentPayableItem.assessorOverrideAmount
      );
      if (isNumber(assessorOverrideAmount)) {
        totalAssessorOverrideAmount = add(
          Number(totalAssessorOverrideAmount),
          assessorOverrideAmount
        );
      }
      totalTreatmentPayableAmount = add(
        totalTreatmentPayableAmount,
        treatmentPayableItem.payableAmount
      );
    });

    if (claimPayableItem.payableAmount !== totalTreatmentPayableAmount) {
      claimPayableItem.claimDecision = {
        value: formUtils.queryValue(claimPayableItem.claimDecision),
        name: 'claimDecision',
        touched: true,
        dirty: false,
        errors: vldClaimDecision(
          totalTreatmentPayableAmount,
          formUtils.queryValue(claimPayableItem.claimDecision)
        ),
        validating: false,
      };
    }

    claimPayableItem.payableAmount = totalTreatmentPayableAmount;
    claimPayableItem.assessorOverrideAmount = null;
    if (isNumber(totalAssessorOverrideAmount)) {
      claimPayableItem.assessorOverrideAmount = totalTreatmentPayableAmount;
    }
  }
}

function calculatReimbursement(claimPayableItem, claimEntities) {
  const { treatmentPayableList, benefitCategory, claimDecision } = claimPayableItem;
  const cDecision = formUtils.queryValue(claimDecision);
  const {
    treatmentPayableListMap,
    invoicePayableListMap,
    invoiceListMap,
    benefitItemPayableListMap,
  } = claimEntities;
  if (benefitCategory === REIMBURSEMENT && isArray(treatmentPayableList)) {
    let totalTreatmentPayableAmount: number = 0;
    let totleTreatmentAssessorOverrideAmount: number | null = null;

    forEach(treatmentPayableList, (treatmentPayableItemId) => {
      const treatmentPayableItem = treatmentPayableListMap[treatmentPayableItemId];
      let totalInvoicePayableAmount: number = 0;
      let totleInvoiceAssessorOverrideAmount: number | null = null;
      const { invoicePayableList } = treatmentPayableItem;

      forEach(compact(invoicePayableList), (invoicePayableItemId) => {
        // 计算每条账单的payableAmount
        const invoicePayableItem = invoicePayableListMap[invoicePayableItemId];
        let totalBenefitPayableAmount: number = 0;
        let totalBenefitAssessorOverrideAmount: number | null = null;
        const { invoiceId, benefitItemPayableList } = invoicePayableItem;
        const invoiceItem = invoiceListMap[invoiceId];
        forEach(compact(benefitItemPayableList), (benefitPayableItemId) => {
          const benefitPayableItem = benefitItemPayableListMap[benefitPayableItemId];
          const assessorOverrideAmount = formUtils.queryValue(
            benefitPayableItem.assessorOverrideAmount
          );
          const payableAmount = formUtils.queryValue(benefitPayableItem.payableAmount);
          if (isNumber(assessorOverrideAmount)) {
            totalBenefitAssessorOverrideAmount = add(
              Number(totalBenefitAssessorOverrideAmount),
              assessorOverrideAmount
            );
          }

          totalBenefitPayableAmount = add(totalBenefitPayableAmount, payableAmount);
        });
        invoicePayableItem.payableAmount = subtract(
          totalBenefitPayableAmount,
          formUtils.queryValue(invoicePayableItem?.deductibleNetExpense) || 0
        );
        // totalnetexpense联动校验
        VLD000230Block(invoiceItem, invoicePayableItem.payableAmount);
        invoicePayableItem.assessorOverrideAmount = null;
        if (
          isNumber(totalBenefitAssessorOverrideAmount) ||
          isNumber(formUtils.queryValue(invoicePayableItem?.deductibleNetExpense))
        ) {
          invoicePayableItem.assessorOverrideAmount = subtract(
            totalBenefitPayableAmount,
            formUtils.queryValue(invoicePayableItem?.deductibleNetExpense) || 0
          );

          totleInvoiceAssessorOverrideAmount = add(
            Number(totleInvoiceAssessorOverrideAmount),
            invoicePayableItem.assessorOverrideAmount
          );
        }
        totalInvoicePayableAmount = add(
          totalInvoicePayableAmount,
          invoicePayableItem.payableAmount
        );
      });

      treatmentPayableItem.payableAmount = totalInvoicePayableAmount;

      treatmentPayableItem.assessorOverrideAmount = null;
      if (isNumber(totleInvoiceAssessorOverrideAmount)) {
        treatmentPayableItem.assessorOverrideAmount = totalInvoicePayableAmount;

        totleTreatmentAssessorOverrideAmount = add(
          Number(totleTreatmentAssessorOverrideAmount),
          treatmentPayableItem.assessorOverrideAmount
        );
      }
      totalTreatmentPayableAmount = add(
        totalTreatmentPayableAmount,
        treatmentPayableItem.payableAmount
      );
    });

    if (claimPayableItem.payableAmount !== totalTreatmentPayableAmount) {
      claimPayableItem.claimDecision = {
        value: formUtils.queryValue(claimPayableItem.claimDecision),
        name: 'claimDecision',
        touched: true,
        dirty: false,
        errors: vldClaimDecision(
          totalTreatmentPayableAmount,
          formUtils.queryValue(claimPayableItem.claimDecision)
        ),
        validating: false,
      };
    }
    claimPayableItem.payableAmount = totalTreatmentPayableAmount;
    claimPayableItem.assessorOverrideAmount = null;
    if (isNumber(totleTreatmentAssessorOverrideAmount)) {
      claimPayableItem.assessorOverrideAmount = totalTreatmentPayableAmount;
    }
  }
}

function calculatAIPA(claimPayableItem, claimEntities) {
  const { treatmentPayableList, benefitCategory } = claimPayableItem;
  const { treatmentPayableListMap, accidentBenefitPayableListMap } = claimEntities;
  if (benefitCategory === AIPA && isArray(treatmentPayableList)) {
    let totalTreatmentPayableAmount: number = 0;
    let totleTreatmentSystemOverrideAmount: number = 0;
    let totleTreatmentAssessorOverrideAmount: number | null = null;

    forEach(treatmentPayableList, (treatmentPayableItemId) => {
      const treatmentPayableItem = treatmentPayableListMap[treatmentPayableItemId];
      let totleAccidentPayableAmount = 0;
      let totleAccidentAssessorOverrideAmount = null;
      let totleAccidentSystemOverrideAmount = 0;
      const { accidentBenefitPayableList } = treatmentPayableItem;

      forEach(accidentBenefitPayableList, (benefitId) => {
        const accidentPayableItem = accidentBenefitPayableListMap[benefitId];
        const systemCalculationAmount = formUtils.queryValue(
          accidentPayableItem.systemCalculationAmount
        );
        const assessorOverrideAmount = formUtils.queryValue(
          accidentPayableItem.assessorOverrideAmount
        );
        const payableAmount = formUtils.queryValue(accidentPayableItem.payableAmount);

        if (isNumber(assessorOverrideAmount)) {
          totleAccidentAssessorOverrideAmount = add(
            Number(totleAccidentAssessorOverrideAmount),
            assessorOverrideAmount
          );
        }
        totleAccidentPayableAmount = add(totleAccidentPayableAmount, Number(payableAmount));
        totleAccidentSystemOverrideAmount = add(
          totleAccidentSystemOverrideAmount,
          Number(systemCalculationAmount)
        );
      });
      treatmentPayableItem.systemCalculationAmount = totleAccidentSystemOverrideAmount;
      treatmentPayableItem.payableAmount = totleAccidentPayableAmount;
      treatmentPayableItem.assessorOverrideAmount = null;
      if (isNumber(totleAccidentAssessorOverrideAmount)) {
        treatmentPayableItem.assessorOverrideAmount = totleAccidentPayableAmount;

        totleTreatmentAssessorOverrideAmount = add(
          Number(totleTreatmentAssessorOverrideAmount),
          treatmentPayableItem.assessorOverrideAmount
        );
      }

      totalTreatmentPayableAmount = add(
        totalTreatmentPayableAmount,
        treatmentPayableItem.payableAmount
      );

      totleTreatmentSystemOverrideAmount = add(
        totleTreatmentSystemOverrideAmount,
        treatmentPayableItem.systemCalculationAmount
      );
    });

    if (claimPayableItem.payableAmount !== totalTreatmentPayableAmount) {
      claimPayableItem.claimDecision = {
        value: formUtils.queryValue(claimPayableItem.claimDecision),
        name: 'claimDecision',
        touched: true,
        dirty: false,
        errors: vldClaimDecision(
          totalTreatmentPayableAmount,
          formUtils.queryValue(claimPayableItem.claimDecision)
        ),
        validating: false,
      };
    }

    claimPayableItem.payableAmount = totalTreatmentPayableAmount;
    claimPayableItem.systemCalculationAmount = totleTreatmentSystemOverrideAmount;
    claimPayableItem.assessorOverrideAmount = null;
    if (isNumber(totleTreatmentAssessorOverrideAmount)) {
      claimPayableItem.assessorOverrideAmount = totalTreatmentPayableAmount;
    }
  }
}

// 逐级计算payableAmount和treatmentExpenseAmount： serveiceItem -> invoice -> treatment ->payable
export const calculatPayableAmount = (claimProcessData: any, claimEntities: any) => {
  let payToHospital: number | null = 0;
  let payToCustomer: number | null = 0;
  const { claimPayableList } = claimProcessData;
  const { claimPayableListMap } = claimEntities;
  if (lodash.isArray(claimPayableList) && claimPayableList.length > 0) {
    lodash.map(claimPayableList, (claimPayableItemId) => {
      const claimPayableItem = claimPayableListMap[claimPayableItemId];
      const { benefitCategory } = claimPayableItem;
      // 津贴时，总金额为所有治疗的总额的总和
      calculatCashLess(claimPayableItem, claimEntities);

      // 医疗时，benefit -> invoice -> treatment -> incident，payableAmount逐级计算
      calculatReimbursement(claimPayableItem, claimEntities);

      // AI/PA产品
      calculatAIPA(claimPayableItem, claimEntities);
      const claimDecisionValue = formUtils.queryValue(claimPayableItem.claimDecision);
      if (claimDecisionValue !== enumClaimDecision.deny) {
        if (benefitCategory === REIMBURSEMENT) {
          payToHospital = add(payToHospital, formUtils.queryValue(claimPayableItem.payableAmount));
        }
        if (benefitCategory === CASHLESS) {
          payToCustomer = add(payToCustomer, formUtils.queryValue(claimPayableItem.payableAmount));
        }
        if (benefitCategory === AIPA) {
          payToCustomer = add(payToCustomer, formUtils.queryValue(claimPayableItem.payableAmount));
        }
      }
    });
  }
  const totalPayableAmount = add(payToCustomer, payToHospital);

  claimProcessData.claimDecision = {
    ...claimProcessData.claimDecision,
    payToCustomer,
    payToHospital,
    totalPayableAmount,
    claimPayableAmount: totalPayableAmount,
  };
};

/**
 * 计算PolicyBenefitList(针对泰国:TH_GC_CTG01/IDAC)
 */
export const calculatPolicyBenefitListAmount = (
  claimProcessData: any,
  claimEntities: any,
  listPolicy: any
) => {
  const { claimPayableList, c360PolicyInfo } = claimProcessData;
  const caseCategory = lodash.get(claimProcessData, 'caseCategory');

  // 只有在上面两个节点才去处理
  if (
    caseCategory !== CaseCategory.TH_GC_CTG01 &&
    caseCategory !== CaseCategory.IDAC &&
    caseCategory !== CaseCategory.TH_GC_CTG06 &&
    caseCategory !== CaseCategory.TH_GC_CTG07
  ) {
    return;
  }

  if (lodash.isArray(claimPayableList) && claimPayableList.length > 0) {
    lodash.map(claimPayableList, (claimPayableItemId) => {
      const policyBenefitList = lodash.map(
        claimProcessData.policyBenefitList,
        (policyBenefitItem) => claimEntities.policyBenefitListMap[policyBenefitItem]
      );

      const claimPayableItem = claimEntities.claimPayableListMap[claimPayableItemId] || {};
      const claimPayableItemPolicyNo = formUtils.queryValue(claimPayableItem.policyNo);
      const policyBenefitItem = lodash.find(policyBenefitList, (item: any) => {
        return formUtils.queryValue(item.policyNo) === claimPayableItemPolicyNo;
      });

      // 修改
      if (policyBenefitItem) {
        const newPolicyBenefitItem = {
          ...policyBenefitItem,
          benefitAmount: getBenefitAmount(
            claimPayableList,
            claimEntities,
            formUtils.queryValue(policyBenefitItem.policyNo),
            caseCategory
          ),
        };
        // 这里的逻辑重复了，因为要匹配policyBenefitItemKey
        lodash.map(Object.keys(claimEntities.policyBenefitListMap), (policyBenefitItemKey: any) => {
          const policyBenefitItem = claimEntities.policyBenefitListMap[policyBenefitItemKey];

          if (formUtils.queryValue(policyBenefitItem.policyNo) === claimPayableItemPolicyNo) {
            claimEntities.policyBenefitListMap[policyBenefitItemKey] = newPolicyBenefitItem;
          }
        });
      } else if (
        formUtils.queryValue(claimPayableItem.claimDecision) !== 'D' &&
        claimPayableItem.payableAmount !== 0
      ) {
        const { claimNo, policyNo, benefitTypeCode }: any = formUtils.cleanValidateData(
          claimPayableItem
        );
        const id = uuidv4();
        const payeeListKeys = lodash.get(claimProcessData, 'payeeList');
        const paymentMethodValue = !lodash.isEmpty(payeeListKeys)
          ? formUtils.cleanValidateData(claimEntities.payeeListMap[payeeListKeys['0']])
              .paymentMethod
          : '';

        const newPolicyBenefitList = [
          ...(lodash.get(claimProcessData, 'policyBenefitList') || []),
          id,
        ];
        const beneficiaryId = uuidv4();
        const newPolicyBenefitItem = {
          id,
          claimNo,
          policyNo,
          policyType: 'I',
          payablesType: 'PTC',
          benefitAmount: getBenefitAmount(claimPayableList, claimEntities, policyNo, caseCategory),
          paymentMethod: paymentMethodValue,
          payTo: 'PO',
          beneficiaryList: [beneficiaryId],
        };
        claimProcessData.policyBenefitList = newPolicyBenefitList;
        claimEntities.policyBenefitListMap[id] = newPolicyBenefitItem;
        claimEntities.beneficiaryListMap[beneficiaryId] = {
          claimNo: claimNo,
          policyBenefitId: id,
          sourceSystem:
            lodash
              .chain(listPolicy || [])
              .find({ policyNo, benefitTypeCode })
              .get('sourceSystem')
              .value() || '',
          id: uuidv4(),
        };
      }
    });
  }
};

export default {
  calculatPayableAmount,
  calculatPolicyBenefitListAmount,
};
