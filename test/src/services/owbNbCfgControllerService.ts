import { stringify } from 'qs';
import request from '@/utils/request';

export async function getTakeOverInfoByPolicyId(params?: any, option?: any): Promise<any> {
  return request('/api/nb/dropdown/getTakeOverInfoByPolicyId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAdultAge(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/getAdultAge', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCfgFactoringHousesByCondition(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/getCfgFactoringHousesByCondition', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findByRegionCodeAndProductCode(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/findByRegionCodeAndProductCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getBankCodesByRenewalPayTypeAndCurrencyCode(
  params?: any,
  option?: any
): Promise<any> {
  return request('/api/nb/cfg/getBankCodesByRenewalPayTypeAndCurrencyCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCfgFactoringHouses(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/getCfgFactoringHouses', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPlanLoadingReasons(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/getPlanLoadingReasons', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCfgPlanProductOptions(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/getCfgPlanProductOptions', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function getDeductibleOptionsByProductCodeAndBenefitPlan(
  params?: any,
  option?: any
): Promise<any> {
  return request('/api/nb/cfg/getDeductibleOptionsByProductCodeAndBenefitPlan', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCfgPlanTsarCalculation(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/getCfgPlanTsarCalculation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCfgPlanTsarCalculationByCondition(
  params?: any,
  option?: any
): Promise<any> {
  return request('/api/nb/cfg/getCfgPlanTsarCalculationByCondition', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCfgPlanbankInfosByPaymentMode(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/getCfgPlanbankInfosByPaymentMode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getContractTypeAndNoRepeat(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/getContractTypeAndNoRepeat', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getDefaultValueByCode(params?: any, option?: any): Promise<any> {
  return request(`/api/nb/cfg/getDefaultValueByCode?${stringify(params)}`, {
    ...option,
  });
}

export async function getTsarCalculationCategoryDisplayPeriod(
  params?: any,
  option?: any
): Promise<any> {
  return request('/api/nb/cfg/getTsarCalculationCategoryDisplayPeriod', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPlanProduct(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/getPlanProduct', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getProductInfoByContractType(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/getProductInfoByContractType', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getRegionalDefaultValues(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/getRegionalDefaultValues', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getRenewalPaymentMethod(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/getRenewalPaymentMethod', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getSpecificCfgFactoringHouses(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/getSpecificCfgFactoringHouses', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function judgeCheckRule(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/judgeCheckRule', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listPlanProductDuration(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/listPlanProductDuration', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listPlanWaiverComponent(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/listPlanWaiverComponent', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateCfgRequestControlBusinessDate(
  params?: any,
  option?: any
): Promise<any> {
  return request('/api/nb/cfg/updateCfgRequestControlBusinessDate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCfgPlanHospitalBenefit(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/getCfgPlanHospitalBenefit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findPlanDictProductListByRegion(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/findPlanDictProductListByRegion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCfgLoadingAllowable(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/getCfgLoadingAllowable', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCfgLoadingMappingUIRule(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/getCfgLoadingMappingUIRule', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCfgLoadingExclusionCopyRule(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/getCfgLoadingExclusionCopyRule', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCfgOccupationRiskLevel(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/getCfgOccupationRiskLevel', {
    localCache: true,
    ...option,
    method: 'GET',
  });
}

export async function getBankCodeFactoringHouseMap(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/getBankCodeFactoringHouseMap', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCfgClientValidate(params?: any, option?: any): Promise<any> {
  return request('/api/nb/cfg/getCfgClientValidate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCfgOccupationInfo(params?: any, option?: any): Promise<any> {
  return await request('/api/nb/cfg/getCfgOccupationInfo', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPlanExtraPremiumLoadingRulesListByRegionCode(
  params?: any,
  option?: any
): Promise<any> {
  return await request(
    `/api/nb/cfg/getPlanExtraPremiumLoadingRulesListByRegionCode?${stringify(params)}`,
    {
      ...option,
      method: 'POST',
    }
  );
}

export async function getFactoringHouseByConditions(params?: any, option?: any): Promise<any> {
  return await request('/api/nb/cfg/getFactoringHouseByConditions', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getAdultAge,
  findByRegionCodeAndProductCode,
  getBankCodesByRenewalPayTypeAndCurrencyCode,
  getCfgFactoringHouses,
  getCfgPlanProductOptions,
  getCfgPlanTsarCalculation,
  getCfgPlanTsarCalculationByCondition,
  getCfgPlanbankInfosByPaymentMode,
  getContractTypeAndNoRepeat,
  getDefaultValueByCode,
  getPlanProduct,
  getRegionalDefaultValues,
  getRenewalPaymentMethod,
  getSpecificCfgFactoringHouses,
  judgeCheckRule,
  listPlanProductDuration,
  listPlanWaiverComponent,
  updateCfgRequestControlBusinessDate,
  getPlanLoadingReasons,
  getCfgPlanHospitalBenefit,
  findPlanDictProductListByRegion,
  getCfgLoadingAllowable,
  getCfgLoadingMappingUIRule,
  getCfgOccupationRiskLevel,
  getBankCodeFactoringHouseMap,
  getCfgClientValidate,
  getProductInfoByContractType,
  getCfgOccupationInfo,
  getPlanExtraPremiumLoadingRulesListByRegionCode,
  getCfgFactoringHousesByCondition,
  getFactoringHouseByConditions,
  getTsarCalculationCategoryDisplayPeriod,
  getCfgLoadingExclusionCopyRule,
};
