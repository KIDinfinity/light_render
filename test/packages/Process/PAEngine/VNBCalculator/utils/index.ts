import { chain, entries, get, isEmpty, isObject, set, forEach } from 'lodash';
import type CalculationAction from 'process/PAEngine/VNBCalculator/enum/CalculationAction';
import { validate } from 'process/PAEngine/VNBCalculator/services/vnbCalculatorServices';
import { vnbConfig } from '../config';

import type {
  Alterations,
  VNBCalculatorState,
  PlanItem,
} from 'process/PAEngine/VNBCalculator/_model/state';

export interface PlanAction {
  action?: CalculationAction;
  pid?: string;
  targetAPE?: number;
}

export const mapBenefitPlans = (
  basicBenefit?: PlanItem,
  subBenefits?: Record<string, PlanItem>
) => {
  const benefits = [basicBenefit, ...Object.values(subBenefits || {})];
  return chain(benefits)
    .filter((item) => !!item)
    .map((item) => {
      if (!item) {
        return item;
      }
      const { pid, mainBenefitSAFactor } = item;
      if (!!mainBenefitSAFactor) {
        return { pid, mainBenefitSAFactor };
      } else {
        const copyItem = { ...item };
        delete copyItem.mainBenefitSAFactor;
        return { ...copyItem };
      }
    })
    .value();
};

export const mapAlterations = (
  ageGroup?: Record<string, number>,
  gender?: Record<string, number>,
  occupationClass?: Record<string, number>,
  paymentMode?: Record<string, number>,
  planAllocation?: Record<string, number>
) => {
  const mapAllocationData = (allocationObj) =>
    Object.entries(allocationObj).map(([code, allocation]) => ({
      code,
      allocation,
    }));
  return {
    ageGroup: mapAllocationData(ageGroup || {}),
    gender: mapAllocationData(gender || {}),
    occupationClass: mapAllocationData(occupationClass || {}),
    paymentMode: mapAllocationData(paymentMode || {}),
    planAllocation: mapAllocationData(planAllocation || {}),
  };
};

export const mapOccClassAgePremium = (occClassAgePremium?: Record<string, number>) => {
  return chain(entries(occClassAgePremium))
    .reduce((output, [key, premiumVal]) => {
      const [occClassCode, ageRange, premiumKey] = key.split('_');
      const k = `${occClassCode}-${ageRange}`;
      const prem = output[k] || { occClassCode, ageRange };
      output[k] = { ...prem, [premiumKey]: premiumVal };
      return output;
    }, {})
    .values()
    .value();
};

export const mapVNBClaculationRequestData = (
  model: VNBCalculatorState,
  action: CalculationAction
) => {
  const {
    product,
    basicInfo,
    targetAPE,
    basicBenefit,
    subBenefits,
    occClassAgePremium,
    alterations: { ageGroup, gender, occupationClass, paymentMode, planAllocation },
  } = model;
  const planAction: PlanAction = { action, pid: product, targetAPE };
  const plans = [planAction];
  const benefitPlans = mapBenefitPlans(basicBenefit, subBenefits);
  plans.push(...benefitPlans);
  const alterations = mapAlterations(
    ageGroup,
    gender,
    occupationClass,
    paymentMode,
    planAllocation
  );
  set(alterations, 'selectedOccClassAgePremium', mapOccClassAgePremium(occClassAgePremium));
  return { channel: vnbConfig.API_CHANNEL, pid: product, basicInfo, plans, alterations };
};

export const validateModel = async (model) => {
  const res = await validate(model);
  const errorList = [];
  if (!isObject(res?.quotation)) {
    errorList.push({
      code: '0001',
      content: 'request validate fail.',
    });
    return Promise.reject(errorList);
  }
  if (!isEmpty(res?.warnings)) {
    res.warnings.forEach((warn) => {
      errorList.push({
        code: warn.code,
        content: warn?.label?.en || warn?.code + ':' + warn?.id,
      });
    });
    return Promise.reject(errorList);
  }
  return Promise.resolve();
};

export const mapBenefitPlanFields = (basicBenefit: PlanItem) => {
  const fields = {};
  Array(10)
    .fill(0)
    .forEach((_, index) => {
      fields[`basicBenefit_sumAssured${index + 1}`] = get(basicBenefit, `sumAssured${index + 1}`);
    });
  return fields;
};

export const mapSubBenefitPlanFields = (
  basicBenefit: PlanItem,
  subBenefits: Record<string, PlanItem>
) => {
  const fields = {};
  Object.values(subBenefits || {}).forEach((ben) => {
    const mainFactor = ben?.mainBenefitSAFactor;
    fields[`subBenefits_${ben?.pid}_mainBenefitSAFactor`] = mainFactor;
    Array(10)
      .fill(0)
      .forEach((_, index) => {
        const factorVal = (mainFactor * get(basicBenefit, `sumAssured${index + 1}`, 0)) / 100;
        fields[`subBenefits_${ben?.pid}_sumAssured${index + 1}`] = mainFactor
          ? factorVal || undefined
          : get(ben, `sumAssured${index + 1}`);
      });
  });
  return fields;
};

export const mapAlerationFields = (alterations: Alterations) => {
  const fields = {};
  if (!alterations) {
    return fields;
  }
  entries(alterations).forEach(([key, val]) => {
    entries(val).forEach(([subKey, subVal]) => {
      fields[`alterations_${key}_${subKey}`] = subVal;
    });
  });
  return fields;
};

export const mapDataToOccClassAgePremium = (data: any) => {
  return chain(data)
    .entries()
    .reduce((output: any, [occKey, groupData]: [string, any[]]) => {
      entries(groupData).forEach(([groupKey, premiumArr]: [string, number[]]) => {
        forEach(premiumArr, (value, index) => {
          output[`${occKey}_${groupKey}_premium${index + 1}`] = value;
        });
      });
      return output;
    }, {})
    .value();
};
