/* eslint-disable import/no-unresolved */
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { multiply, divide, subtract } from '@/utils/precisionUtils';
import { BenefitCategory, SwitchEnum } from 'claim/pages/utils/claim';
import { supportLimitCodeList, BenefitLimitCode } from '../dto/index';

/**
 * 过滤掉源对象中指定key以外的成员(包括值为nullish)
 * @param source 源对象
 * @param keys 源对象中指定的key值数组
 */
export function filterByKeysAll(source: object, keys: string[]) {
  const output = {};
  lodash.forEach(keys, (key) => {
    output[key] = source[key];
  });
  return output;
}

/**
 * 根据accumulateLimitList计算remainingDays
 * @param accumulateLimitList 源对象
 */
export function calculateRemainingDays(accumulateLimitList: any) {
  const item: any = lodash.find(accumulateLimitList, {
    limitCode: BenefitLimitCode.WEEKS_PER_DISABILITY_LIMIT,
  });
  const shareItem: any = lodash.find(accumulateLimitList, {
    limitCode: BenefitLimitCode.SHARE_WEEKS_PER_DISABILITY_LIMIT,
  });

  if (!item && !shareItem) return 0;
  const target = lodash.maxBy([item, shareItem], 'accumulateValue');

  const remainingDays =
    lodash.get(target, 'limitValue', 0) * 7 - lodash.get(target, 'accumulateValue', 0);
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

/**
 * 保存claimPayable层级benefitTypeCode对应的manualAdd的值到benefitTypeManualAddMap对象
 * 保存lifePayable层级benefitItemCode对应的manualAdd,
 * treatmentPayable层级benefitItemCode对应的manualAdd，
 * accidentBenefitPayable层级benefitItemCode对应的manualAdd的值到benefitItemManualAddMap对象
 * @param claimEntities
 */
export function handleBenefitManualAdd(claimEntities) {
  const {
    claimPayableListMap,
    treatmentPayableListMap,
    accidentBenefitPayableListMap,
  } = claimEntities;
  const benefitItemManualAddMap = {};
  const benefitTypeManualAddMap = {};

  lodash.forEach(claimPayableListMap, (claimPayable) => {
    const { benefitTypeCode, benefitCategory, manualAdd, lifePayable } = claimPayable;
    if (benefitTypeCode) {
      benefitTypeManualAddMap[benefitTypeCode] = manualAdd;
    }
    if (benefitCategory === BenefitCategory.life && !lodash.isEmpty(lifePayable)) {
      // eslint-disable-next-line no-shadow
      const { benefitItemCode, manualAdd } = lifePayable;
      if (benefitItemCode) {
        benefitItemManualAddMap[benefitItemCode] = manualAdd;
      }
    }
  });

  lodash.forEach(treatmentPayableListMap, (treatmentPayable) => {
    const { benefitItemCode, manualAdd } = treatmentPayable;
    if (benefitItemCode) {
      benefitItemManualAddMap[benefitItemCode] = manualAdd;
    }
  });

  lodash.forEach(accidentBenefitPayableListMap, (accidentBenefitPayable) => {
    const { benefitItemCode, manualAdd } = accidentBenefitPayable;
    if (benefitItemCode) {
      benefitItemManualAddMap[benefitItemCode] = manualAdd;
    }
  });

  return { benefitItemManualAddMap, benefitTypeManualAddMap };
}

export function getManualAdd(benefitManualAddMap, benefitCode) {
  return benefitCode && benefitManualAddMap[benefitCode] === null ? null : SwitchEnum.YES;
}

export default {
  filterByKeysAll,
};
