import lodash, { get } from 'lodash';
import { add, divide, multiply } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';
import type { IInvoicePayable } from '@/dtos/claim';
import { ClaimDecision, BenefitCategory } from 'claim/pages/utils/claim';
import { tenant } from '@/components/Tenant';

const getExchangeRateByPayableId = (claimPayableListMap: any, payableId: string) => {
  const claimPayableItem = claimPayableListMap[payableId];
  const exchangeRate = claimPayableItem?.exchangeRatePolicyPayout || 1;
  return exchangeRate;
};

const getExchangeRateInvoicePolicy = (claimEntities: any, invoiceId: string) => {
  let totalExpenseAmount = 0;
  const systemCurrency = tenant.currency();

  const { invoiceListMap, invoicePayableListMap, claimPayableListMap } = claimEntities;
  const expense = formUtils.queryValue(get(invoiceListMap[invoiceId], 'expense'));
  const exchangeRateInvoicePayout = formUtils.queryValue(
    get(invoiceListMap[invoiceId], 'exchangeRateInvoicePayout')
  );
  const policyCurrencyList = lodash
    .chain(invoicePayableListMap)
    .filter((invoicePayableItem) => invoicePayableItem.invoiceId === invoiceId)
    .map((invoicePayableItem) => {
      return {
        exchangeRateInvoicePolicy: invoicePayableItem?.exchangeRateInvoicePolicy || 1,
        policyCurrency: invoicePayableItem?.policyCurrency || systemCurrency,
        exchangeRatePolicyPayout: getExchangeRateByPayableId(
          claimPayableListMap,
          invoicePayableItem.payableId
        ),
      };
    })
    .uniqBy(['exchangeRate', 'policyCurrency'])
    .value();
  if (lodash.size(policyCurrencyList) === 1) {
    const { exchangeRateInvoicePolicy, exchangeRatePolicyPayout } = policyCurrencyList[0];
    totalExpenseAmount = multiply(
      expense,
      multiply(exchangeRateInvoicePolicy, exchangeRatePolicyPayout)
    );
  } else {
    totalExpenseAmount = multiply(expense, exchangeRateInvoicePayout);
  }
  return totalExpenseAmount;
};

const calPayoutAmount = (payableAmount: number, exchangeRate: number) => {
  return +Number(multiply(payableAmount, lodash.toNumber(exchangeRate))).toFixed(2);
};

/**
 * 计算当前的incident对应claimPayable赔付的payableAmount总金额
 * @param {claimEntities} claimEntities
 * @param {incidentId} incidentId
 */

export function calculatPayoutAmountIncidentLevel(
  claimEntities: any,
  claimProcessData: any,
  incidentId: string
) {
  return +lodash
    .chain(claimEntities.claimPayableListMap)
    .values()
    .filter(
      (item: any) =>
        item.incidentId === incidentId &&
        (formUtils.queryValue(item.claimDecision) === ClaimDecision.approve ||
          formUtils.queryValue(item.claimDecision) === ClaimDecision.exGratia ||
          formUtils.queryValue(item.claimDecision) === ClaimDecision.pending)
    )
    .reduce(
      (result: number | null, cur: any) =>
        add(result, calPayoutAmount(cur?.payableAmount, cur?.exchangeRatePolicyPayout)),
      0
    )
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
        (formUtils.queryValue(item.claimDecision) === ClaimDecision.pending ||
          formUtils.queryValue(item.claimDecision) === ClaimDecision.approve ||
          formUtils.queryValue(item.claimDecision) === ClaimDecision.exGratia) &&
        item.benefitCategory === BenefitCategory.reimbursement
    )
    .reduce(
      (result: number | null, cur: any) =>
        add(result, calPayoutAmount(cur?.payableAmount, formUtils.queryValue(cur?.exchangeRatePolicyPayout))),
      0
    )
    .value();

  let totalExpense = 0;

  lodash.forEach(claimEntities.incidentListMap[incidentId].treatmentList, (treatmentId) => {
    totalExpense = +lodash
      .chain(claimEntities.treatmentListMap[treatmentId].invoiceList)
      .reduce((result: number | null, invoiceId: any) => {
        return add(result, getExchangeRateInvoicePolicy(claimEntities, invoiceId));
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
export function calculatPayoutAmountTreatmentLevel(
  claimEntities: any,
  claimProcessData: any,
  treatmentId: string
) {
  return +lodash
    .chain(claimEntities.treatmentPayableListMap)
    .values()
    .filter((item: any) => item.treatmentId === treatmentId)
    .reduce(
      (result: number | null, cur: any) =>
        add(
          result,
          calPayoutAmount(
            cur?.payableAmount,
            getExchangeRateByPayableId(claimEntities.claimPayableListMap, cur?.payableId)
          )
        ),
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
      (result: number | null, cur: any) =>
        add(
          result,
          calPayoutAmount(
            cur?.payableAmount,
            getExchangeRateByPayableId(claimEntities.claimPayableListMap, cur?.payableId)
          )
        ),
      0
    )
    .value();

  const totalExpense = +lodash
    .chain(claimEntities.treatmentListMap[treatmentId].invoiceList)
    .values()
    .reduce(
      (result: number | null, invoiceId: any) =>
        add(result, getExchangeRateInvoicePolicy(claimEntities, invoiceId)),
      0
    )
    .value();

  return totalPayableAmount !== 0 && totalExpense !== 0
    ? +Number(multiply(divide(totalPayableAmount, totalExpense), 100)).toFixed(0)
    : 0;
}

/**
 * 计算当前的invoiceId对应invoicePayable赔付的payableAmount总金额
 * @param {claimEntities} claimEntities
 * @param {invoiceId} invoiceId
 */
export function calculatPayoutAmountInvoiceLevel(
  claimEntities: any,
  claimProcessData: any,
  invoiceId: string
) {
  return +lodash
    .chain(claimEntities.invoicePayableListMap)
    .values()
    .filter((item: IInvoicePayable) => item.invoiceId === invoiceId)
    .reduce(
      (result: number | null, cur: any) =>
        add(
          result,
          calPayoutAmount(
            cur?.payableAmount,
            getExchangeRateByPayableId(claimEntities.claimPayableListMap, cur?.payableId)
          )
        ),
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
      (result: number | null, cur: any) =>
        add(
          result,
          calPayoutAmount(
            cur?.payableAmount,
            getExchangeRateByPayableId(claimEntities.claimPayableListMap, cur?.payableId)
          )
        ),
      0
    )
    .value();
  const totalExpense = getExchangeRateInvoicePolicy(claimEntities, invoiceId);

  return totalPayableAmount !== 0 && totalExpense !== 0
    ? +Number(multiply(divide(totalPayableAmount, totalExpense), 100)).toFixed(0)
    : 0;
}
/**
 * 计算当前的serviceItemIdd对应servicePayable赔付的payableAmount总金额
 * @param {claimEntities} claimEntities
 * @param {serviceItemId} serviceItemId
 */
export function calculatPayoutAmountServiceLevel(
  claimEntities: any,
  claimProcessData: any,
  serviceItemId: string
) {
  return +lodash
    .chain(claimEntities.serviceItemPayableListMap)
    .values()
    .filter((item) => item.serviceItemId === serviceItemId)
    .reduce(
      (result: number | null, cur: any) =>
        add(
          result,
          calPayoutAmount(
            cur?.payableAmount,
            getExchangeRateByPayableId(claimEntities.claimPayableListMap, cur?.payableId)
          )
        ),
      0
    )
    .value();
}

export default {
  calculatPayoutAmountIncidentLevel,
  calculatPayoutAmountTreatmentLevel,
  calculatPayoutAmountInvoiceLevel,
  calculatPayoutAmountServiceLevel,
  calculatPayableProportionIncidentLevel,
  calculatPayableProportionTreatmentLevel,
  calculatPayableProportionInvoiceLevel,
};
