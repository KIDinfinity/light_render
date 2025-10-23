import lodash, { get, isPlainObject } from 'lodash';
import { formUtils } from 'basic/components/Form';
import { add, divide, multiply } from '@/utils/precisionUtils';
import type { IInvoicePayable } from '@/dtos/claim';
import { ClaimDecision, BenefitCategory } from 'claim/pages/utils/claim';

/**
 * 计算当前的incident对应claimPayable赔付的claimAdjustment总金额
 * @param {claimEntities} claimEntities
 * @param {incidentId} incidentId
 */
export function calculateClaimAdjustmentIncidentLevel(claimEntities: any, incidentId: string) {
  return +lodash
    .chain(claimEntities.claimPayableListMap)
    .values()
    .filter(
      (item: any) =>
        item.incidentId === incidentId &&
        (formUtils.queryValue(item.appealRequestDecision) === ClaimDecision.approve ||
          formUtils.queryValue(item.appealRequestDecision) === ClaimDecision.exGratia)
    )
    .reduce(
      (result: number | null, cur: any) => add(result, formUtils.queryValue(cur.claimAdjustment)),
      0
    )
    .value();
}

/**
 * 计算当前的incident对应claimPayable赔付的payableAmount总金额
 * @param {claimEntities} claimEntities
 * @param {incidentId} incidentId
 */
export function calculatPayableAmountIncidentLevel(claimEntities: any, incidentId: string) {
  return +lodash
    .chain(claimEntities.claimPayableListMap)
    .values()
    .filter(
      (item: any) =>
        item.incidentId === incidentId &&
        (formUtils.queryValue(item.claimDecision) === ClaimDecision.approve ||
          formUtils.queryValue(item.claimDecision) === ClaimDecision.deny ||
          formUtils.queryValue(item.claimDecision) === ClaimDecision.exGratia)
    )
    .reduce((result: number | null, cur: any) => {
      let val = 0;
      if (
        formUtils.queryValue(cur.claimDecision) === ClaimDecision.deny &&
        formUtils.queryValue(cur.denyWithRescission)
      ) {
        val = formUtils.queryValue(cur.systemCalculationAmount);
      } else if (
        formUtils.queryValue(cur.claimDecision) === ClaimDecision.approve ||
        formUtils.queryValue(cur.claimDecision) === ClaimDecision.exGratia
      ) {
        val = formUtils.queryValue(cur.payableAmount);
      }
      return add(result, val);
    }, 0)
    .value();
}

/**
 * 计算当前的incident对应claimPayable赔付的payableAmount总金额和赔付比例
 * @param {claimEntities} claimEntities
 * @param {incidentId} incidentId
 */
export function calculatPayableProportionIncidentLevel(claimEntities: any, incidentId: string) {
  const totalPayableAmount = +lodash
    .chain(claimEntities.claimPayableListMap)
    .values()
    .filter(
      (item: any) =>
        item.incidentId === incidentId &&
        (formUtils.queryValue(item.claimDecision) === ClaimDecision.approve ||
          formUtils.queryValue(item.claimDecision) === ClaimDecision.exGratia) &&
        item.benefitCategory === BenefitCategory.reimbursement
    )
    .reduce(
      (result: number | null, cur: any) => add(result, formUtils.queryValue(cur.payableAmount)),
      0
    )
    .value();

  let totalExpense = +lodash
    .chain(claimEntities.claimPayableListMap)
    .values()
    .filter(
      (item: any) =>
        item.incidentId === incidentId &&
        item.benefitCategory === BenefitCategory.life &&
        isPlainObject(item.lifePayable)
    )
    .reduce(
      (result: number | null, cur: any) =>
        add(result, formUtils.queryValue(cur.lifePayable.calculationAmount)),
      0
    )
    .value();

  lodash.forEach(claimEntities.incidentListMap[incidentId].treatmentList, (treatmentId) => {
    totalExpense = +lodash
      .chain(claimEntities.treatmentListMap[treatmentId].invoiceList)
      .reduce((result: number | null, invoiceId: any) => {
        return add(
          result,
          formUtils.queryValue(get(claimEntities.invoiceListMap[invoiceId], 'expense'))
        );
      }, totalExpense)
      .value();
  });

  return totalPayableAmount !== 0 && totalExpense !== 0
    ? +Number(multiply(divide(totalPayableAmount, totalExpense), 100)).toFixed(0)
    : 0;
}

/**
 * 计算当前的treatmentId对应treatmentPayable赔付的payableAmount总金额
 * @param {claimEntities} claimEntities
 * @param {treatmentId} incidentId
 */
export function calculatPayableAmountTreatmentLevel(claimEntities: any, treatmentId: string) {
  return +lodash
    .chain(claimEntities.treatmentPayableListMap)
    .values()
    .filter((item: any) => item.treatmentId === treatmentId)
    .reduce(
      (result: number | null, cur: any) => add(result, formUtils.queryValue(cur.payableAmount)),
      0
    )
    .value();
}

/**
 * 计算当前的treatmentId对应treatmentPayable赔付的claimAdjustment总金额
 * @param {claimEntities} claimEntities
 * @param {treatmentId} incidentId
 */
export function calculatClaimAdjustmentTreatmentLevel(claimEntities: any, treatmentId: string) {
  return +lodash
    .chain(claimEntities.treatmentPayableListMap)
    .values()
    .filter((item: any) => item.treatmentId === treatmentId)
    .reduce(
      (result: number | null, cur: any) => add(result, formUtils.queryValue(cur.claimAdjustment)),
      0
    )
    .value();
}

/**
 * 计算当前的treatment对应treatmentPayable赔付的payableAmount总金额和赔付比例
 * @param {claimEntities} claimEntities
 * @param {treatmentId} treatmentId
 */
export function calculatPayableProportionTreatmentLevel(claimEntities: any, treatmentId: string) {
  const totalPayableAmount = +lodash
    .chain(claimEntities.treatmentPayableListMap)
    .values()
    .filter(
      (item: any) =>
        item.treatmentId === treatmentId &&
        get(claimEntities.claimPayableListMap[item.payableId], 'benefitCategory') ===
          BenefitCategory.reimbursement
    )
    .reduce(
      (result: number | null, cur: any) => add(result, formUtils.queryValue(cur.payableAmount)),
      0
    )
    .value();

  const totalExpense = +lodash
    .chain(claimEntities.treatmentListMap[treatmentId].invoiceList)
    .values()
    .reduce(
      (result: number | null, invoiceId: any) =>
        add(result, formUtils.queryValue(get(claimEntities.invoiceListMap[invoiceId], 'expense'))),
      0
    )
    .value();

  return totalPayableAmount !== 0 && totalExpense !== 0
    ? +Number(multiply(divide(totalPayableAmount, totalExpense), 100)).toFixed(0)
    : 0;
}

/**
 * 计算当前的invoiceId对应invoicePayable赔付的claimAdjustment总金额
 * @param {claimEntities} claimEntities
 * @param {invoiceId} invoiceId
 */
export function calculatClaimAdjustmentInvoiceLevel(claimEntities: any, invoiceId: string) {
  return +lodash
    .chain(claimEntities.invoicePayableListMap)
    .values()
    .filter((item: IInvoicePayable) => item.invoiceId === invoiceId)
    .reduce(
      (result: number | null, cur: IInvoicePayable) =>
        add(result, formUtils.queryValue(cur.claimAdjustment)),
      0
    )
    .value();
}

/**
 * 计算当前的invoiceId对应invoicePayable赔付的payableAmount总金额
 * @param {claimEntities} claimEntities
 * @param {invoiceId} invoiceId
 */
export function calculatPayableAmountInvoiceLevel(claimEntities: any, invoiceId: string) {
  return +lodash
    .chain(claimEntities.invoicePayableListMap)
    .values()
    .filter((item: IInvoicePayable) => item.invoiceId === invoiceId)
    .reduce(
      (result: number | null, cur: IInvoicePayable) =>
        add(result, formUtils.queryValue(cur.payableAmount)),
      0
    )
    .value();
}

/**
 * 计算当前的invoice对应invoicePayable赔付的payableAmount总金额和赔付比例
 * @param {claimEntities} claimEntities
 * @param {invoiceId} invoiceId
 */
export function calculatPayableProportionInvoiceLevel(claimEntities: any, invoiceId: string) {
  const totalPayableAmount = +lodash
    .chain(claimEntities.invoicePayableListMap)
    .values()
    .filter((item: IInvoicePayable) => item.invoiceId === invoiceId)
    .reduce(
      (result: number | null, cur: IInvoicePayable) =>
        add(result, formUtils.queryValue(cur.payableAmount)),
      0
    )
    .value();
  const totalExpense = +formUtils.queryValue(claimEntities.invoiceListMap[invoiceId].expense);

  return totalPayableAmount !== 0 && totalExpense !== 0
    ? +Number(multiply(divide(totalPayableAmount, totalExpense), 100)).toFixed(0)
    : 0;
}

export default {
  calculatPayableAmountIncidentLevel,
  calculatPayableProportionIncidentLevel,
  calculatPayableAmountTreatmentLevel,
  calculatPayableProportionTreatmentLevel,
  calculatPayableAmountInvoiceLevel,
  calculatPayableProportionInvoiceLevel,
};
