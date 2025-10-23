import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
import { multiply, divide, subtract, add } from '@/utils/precisionUtils';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { supportLimitCodeList, BenefitLimitCode } from '../dto/index';

/**
 * 根据accumulateLimitList计算remainingDays
 * @param accumulateLimitList 源对象
 */
export function calculateRemainingDays(accumulateLimitList: any) {
  const target: any = { limitCode: BenefitLimitCode.WEEKS_PER_DISABILITY_LIMIT };
  const item: any = lodash.find(accumulateLimitList, target);
  if (!item) return 0;
  const remainingDays =
    lodash.get(item, 'limitValue', 0) * 7 - lodash.get(item, 'accumulateValue', 0);
  return Math.max(remainingDays, 0) || 0;
}

/**
 * 根据accumulateLimitList计算remainingYears
 * @param accumulateLimitList
 */
export function calculateRemainingYears(accumulateLimitList: any) {
  const target: any = { limitCode: BenefitLimitCode.YEAR_PER_LIFETIME_LIMIT };
  const item: any = lodash.find(accumulateLimitList, target);
  if (!item) return 0;
  const remainingYears = lodash.get(item, 'limitValue', 0) - lodash.get(item, 'accumulateValue', 0);
  return Math.max(remainingYears, 0) || 0;
}

/**
 * 获取accidentBenefitPayableListItem选中的listPolicy中的accumulateLimitList
 * @param accidentBenefitPayableItem 当前修改的accidentBenefitPayableList Item
 * @param listPolicy listPolicies 接口返回的保单列表
 */
export function getAccumulateLimitList(accidentBenefitPayableItem, listPolicy) {
  const curPolicyNo = formUtils.queryValue(accidentBenefitPayableItem.policyNo);
  const curBenefitTypeCode = formUtils.queryValue(accidentBenefitPayableItem.benefitTypeCode);
  const productCode = formUtils.queryValue(accidentBenefitPayableItem.productCode);
  const benefitItemCode = formUtils.queryValue(accidentBenefitPayableItem.benefitItemCode);
  const policyItem = lodash.find(
    listPolicy,
    (item) =>
      item.policyNo === curPolicyNo &&
      item.benefitTypeCode === curBenefitTypeCode &&
      item.coreProductCode === productCode &&
      item.benefitItemCode === benefitItemCode
  );
  return policyItem ? policyItem.accidentBenefit.accumulateLimitList : [];
}

/**
 * 获取accidentBenefitPayableListItem选中的listPolicy中的accumulateLimitList
 * @param accidentBenefitPayableItem 当前修改的accidentBenefitPayableList Item
 * @param listPolicy listPolicies 接口返回的保单列表
 */
export function getAccumulateBenefitItem(accidentBenefitPayableItem: any, listPolicy: any[]) {
  const curPolicyNo = formUtils.queryValue(accidentBenefitPayableItem.policyNo);
  const curBenefitTypeCode = formUtils.queryValue(accidentBenefitPayableItem.benefitTypeCode);
  const productCode = formUtils.queryValue(accidentBenefitPayableItem.productCode);
  const benefitItemCode = formUtils.queryValue(accidentBenefitPayableItem.benefitItemCode);
  const policyItem = lodash.find(
    listPolicy,
    (item) =>
      item.policyNo === curPolicyNo &&
      item.benefitTypeCode === curBenefitTypeCode &&
      item.coreProductCode === productCode &&
      item.benefitItemCode === benefitItemCode
  );
  return policyItem ? policyItem.accidentBenefit : {};
}

/**
 * 从accumulateLimitList获取AccidentBenefitPayableItem
 * @param accumulateLimitList
 */
export function getAccumulateLimitItem(accumulateLimitList) {
  const accumulateLimit = lodash.find(
    accumulateLimitList,
    (item) => lodash.indexOf(supportLimitCodeList, item.limitCode) !== -1
  );
  return accumulateLimit || {};
}

/**
 * 文档链接http://10.22.25.95:8090/display/THRCS/US+248+-+Handle+AI+Product
 * @param accidentBenefitPayableItem
 * @param benefitAmount
 */
export function calculationAmount(accidentBenefitPayableItem: any, benefitAmount: number) {
  const {
    payableDays,
    remainingDays,
    saPercentage,
    saPercentagePerYear,
    payableYears,
    remainingYears,
    limitCode,
    amountPerWeek,
    saPercentagePerWeek,
    maxAmountPerWeek,
    maxAmountPerLifetime,
    saPercentagePerDisability,
    accumulatedAmount,
  } = formUtils.cleanValidateData(accidentBenefitPayableItem);

  const minDays = Math.min(payableDays, remainingDays) || 0;
  const minYears = Math.min(payableYears, remainingYears) || 0;
  const sa = Number(formUtils.queryValue(lodash.cloneDeep(benefitAmount))) || 0;
  const amountPerLifetimeLimit = formUtils.queryValue(maxAmountPerLifetime);

  let result: number = 0;
  switch (limitCode) {
    case BenefitLimitCode.AMOUNT_PER_WEEK:
      result = amountPerWeekFn(amountPerWeek, minDays);
      break;
    case BenefitLimitCode.SA_PERCENTAGE_PER_WEEK:
      result = saPercentagePerWeekFn(sa, saPercentagePerWeek, minDays, maxAmountPerWeek);
      break;
    case BenefitLimitCode.SA_PERCENTAGE:
      result = saPercentageFn(sa, saPercentage, amountPerLifetimeLimit);
      break;
    case BenefitLimitCode.SA_PERCENTAGE_PER_YEAR:
      result = saPercentagePerYearFn(sa, saPercentagePerYear, minYears);
      break;
    case BenefitLimitCode.SA_PERCENTAGE_PER_DISABILITY:
      result = saPercentagePerDisabilityFn(sa, saPercentagePerDisability, accumulatedAmount);
      break;
    default:
      break;
  }
  return lodash.round(result, 2);
}

function amountPerWeekFn(amountPerWeek: number, minDays: number): number {
  const amountPerDay = divide(amountPerWeek, 7);
  return multiply(amountPerDay, minDays);
}

function saPercentagePerWeekFn(
  sa: number,
  saPercentagePerWeek: number,
  minDays: number,
  maxAmountPerWeek: number
): number {
  const saAmountPerWeek = divide(multiply(sa, saPercentagePerWeek), 100);
  const saAmountPerDay = divide(saAmountPerWeek, 7);
  let result = multiply(saAmountPerDay, minDays);
  if (lodash.isNumber(maxAmountPerWeek)) {
    const minWeekLimit = Math.min(saAmountPerWeek, maxAmountPerWeek) || 0;
    const minAmountPerDay = divide(minWeekLimit, 7);
    result = multiply(minAmountPerDay, minDays);
  }
  return result;
}

function saPercentageFn(sa: number, saPercentage: number, amountPerLifetimeLimit: number): number {
  if (!lodash.isNumber(saPercentage)) {
    return 0;
  }
  const saAmountPerDay = divide(multiply(sa, saPercentage), 100);
  if (lodash.isNumber(amountPerLifetimeLimit)) {
    return Math.min(amountPerLifetimeLimit, saAmountPerDay);
  }
  return saAmountPerDay;
}

function saPercentagePerYearFn(sa: number, saPercentagePerYear: number, minYears: number): number {
  if (lodash.isNumber(saPercentagePerYear)) {
    const saAmountPerYear = divide(multiply(sa, saPercentagePerYear), 100);
    return multiply(saAmountPerYear, minYears);
  }
  return 0;
}

function saPercentagePerDisabilityFn(
  sa: number,
  saPercentagePerDisability: number,
  accumulatedAmount: number
): number {
  // return Math.max(subtract(divide(multiply(sa, saPercentagePerDisability), 100), accumulatedAmount), 0);
  return Math.max(
    subtract(divide(multiply(sa, saPercentagePerDisability), 100), accumulatedAmount),
    0
  );
}

export function getManualAdd(benefitManualAddMap, benefitCode) {
  return benefitCode && benefitManualAddMap[benefitCode] === null ? null : SwitchEnum.YES;
}

export const shouldDo = (changedFields: any, target: string) => {
  if (
    lodash.size(changedFields) === 1 &&
    lodash.has(changedFields, target) &&
    !lodash.get(changedFields, `${target}.dirty`)
  ) {
    return true;
  }
  return false;
};

const countDuration = (curDate: any, targetDate: any) => {
  const curYear = moment(formUtils.queryValue(curDate)).year();
  const oldYear = moment(targetDate).year();
  const curMonth = moment(formUtils.queryValue(curDate)).month();
  const oldMonth = moment(targetDate).month();
  const durationMonth = subtract(curMonth, oldMonth);
  const durationYear =
    durationMonth < 0 ? subtract(curYear, oldYear) - 1 : subtract(curYear, oldYear);
  return {
    year: durationYear,
    month: durationMonth >= 0 ? durationMonth : add(12, durationMonth),
  };
};

export const countPolicyDuration = (curDate: any, targetDate: any) => {
  const { year, month } = countDuration(curDate, targetDate);
  return { year, month };
};

export const countContestableClaim = (curDate: any, targetDate: any) => {
  const { year } = countDuration(curDate, targetDate);
  return year < 2 ? 1 : 0;
};
