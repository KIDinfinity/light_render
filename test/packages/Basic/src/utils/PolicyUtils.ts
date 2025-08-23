/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from 'dva';
import lodash from 'lodash';

const policyUtils = {
  splitBenefitTypeCode: (benefitTypeCode: string) => {
    return lodash.isString(benefitTypeCode) && benefitTypeCode.includes(',')
      ? {
          benefitTypeCode: benefitTypeCode.substr(0, benefitTypeCode.indexOf(',')),
          coverageKey: benefitTypeCode.substr(
            benefitTypeCode.indexOf(',') + 1,
            benefitTypeCode.length
          ),
        }
      : { benefitTypeCode };
  },
  getPolicyList: (NAMESPACE: string) => {
    const policyList = useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listPolicy
    );
    return policyList;
  },
  getPolicyNoList: ({ listPolicy, policyNo, ...extra }: any) => {
    return lodash.filter(listPolicy, { policyNo, ...extra }) || [];
  },
  getPolicyForBenefitItemList: ({
    listPolicy,
    policyNo,
    benefitTypeCode,
    coverageKey,
    ...extra
  }: any) => {
    return (
      lodash
        .chain(listPolicy)
        .filter({ policyNo, benefitTypeCode, coverageKey, ...extra })
        .uniqBy('benefitItemCode')
        .value() || []
    );
  },
  getPolicyForBenefitItemCodeList: ({
    listPolicy,
    benefitTypeCode,
    coverageKey,
    benefitItemCode,
    policyNo,
  }: any) => {
    return (
      lodash
        .chain(listPolicy)
        .filter({ benefitTypeCode, coverageKey, benefitItemCode, policyNo })
        .uniqBy('benefitItemCode')
        .value() || []
    );
  },
  getPolicyForBenefitTypeListForPH: ({
    booster = true,
    coverageKey = false,
    policyNo,
    productCode,
    listPolicy,
    benefitNameMap,
  }: any) => {
    return lodash
      .chain(listPolicy)
      .filter((item) => {
        const withBooster = booster
          ? item.booster !== 'Y' || item.isStandaloneBooster === 'Y'
          : true;
        return lodash.toUpper(item.policyNo) === lodash.toUpper(policyNo) && withBooster;
      })
      .filter((item) => !productCode || item.coreProductCode === productCode)
      .map((item) => {
        return coverageKey
          ? {
              ...item,
              benefitTypeCode: item?.coverageKey
                ? `${item?.benefitTypeCode},${item?.coverageKey}`
                : item?.benefitTypeCode,
              benefitTypeName: `${item?.benefitTypeCode} - ${item?.benefitTypeName}`,
            }
          : benefitNameMap
            ? {
                benefitTypeName: `${item?.benefitTypeCode} - ${item?.benefitTypeName}`,
              }
            : item;
      })
      .uniqBy('benefitTypeCode')
      .value();
  },
  getPolicyForBenefitTypeList: ({
    booster = true,
    coverageKey = false,
    policyNo,
    listPolicy,
  }: any) => {
    return lodash
      .chain(listPolicy)
      .filter((item) => {
        const withBooster = booster
          ? item.booster !== 'Y' || item.isStandaloneBooster === 'Y'
          : true;
        return lodash.toUpper(item.policyNo) === lodash.toUpper(policyNo) && withBooster;
      })
      .map((item) => {
        return coverageKey
          ? {
              ...item,
              benefitTypeCode: item?.coverageKey
                ? `${item?.benefitTypeCode},${item?.coverageKey}`
                : item?.benefitTypeCode,
              benefitTypeName:
                lodash.isString(item?.coverageKey) && item?.coverageKey.slice(2, 3)
                  ? `${item?.coverageKey.slice(2, 4)}-${item.benefitTypeName}`
                  : item.benefitTypeName,
            }
          : item;
      })
      .uniqBy('benefitTypeCode')
      .value();
  },
  findPolicyItemOnly: ({
    listPolicy,
    policyNo,
    benefitTypeCode,
    coverageKey,
    benefitItemCode,
  }: any) => {
    return lodash.find(listPolicy, { policyNo, benefitItemCode, benefitTypeCode, coverageKey });
  },
  findPolicyBooster: ({
    listPolicy,
    policyNo,
    benefitItemCode,
    coreProductCode: productCode,
    productPlan,
    policyYear,
  }: any) => {
    return (
      lodash.find(listPolicy, {
        policyNo,
        benefitItemCode,
        coreProductCode: productCode,
        productPlan,
        booster: 'Y',
        policyYear,
      }) || {}
    );
  },
  getPolicyItem: ({ listPolicy, policyNo, ...extra }: any) => {
    const list: any = lodash.filter(listPolicy, { policyNo, ...extra });
    const standaloneBoosterItem =
      lodash.find(list, (el: any) => el.isStandaloneBooster === 'Y') || {};
    const baseItem = lodash.find(
      list,
      (el: any) => !el.isStandaloneBooster || el.isStandaloneBooster === 'N'
    );
    return baseItem || standaloneBoosterItem;
  },
  getCustomBenefitItemCodeList: ({
    listPolicy,
    policyNo,
    benefitTypeCode,
    coverageKey,
    benefitItemCode,
    ...extra
  }: any) => {
    return (
      lodash
        .chain(listPolicy)
        .filter({ benefitTypeCode, coverageKey, benefitItemCode, policyNo, ...extra })
        .uniqBy('benefitItemCode')
        .value() || []
    );
  },
  getCoverageKey: ({ NAMESPACE, payableId }: any) => {
    const claimPayableItem =
      useSelector(
        ({ [NAMESPACE]: modelnamepsace }: any) =>
          modelnamepsace.claimEntities?.claimPayableListMap?.[payableId]
      ) || {};
    return claimPayableItem.coverageKey;
  },
};

export const splitBenefitTypeCode = policyUtils.splitBenefitTypeCode;
export const getPolicyList = policyUtils.getPolicyList;
export const getPolicyNoList = policyUtils.getPolicyNoList;
export const getPolicyForBenefitTypeList = policyUtils.getPolicyForBenefitTypeList;
export const getPolicyForBenefitItemList = policyUtils.getPolicyForBenefitItemList;
export const getPolicyForBenefitItemCodeList = policyUtils.getPolicyForBenefitItemCodeList;
export const getPolicyForBenefitTypeListForPH = policyUtils.getPolicyForBenefitTypeListForPH;

export const findPolicyItemOnly = policyUtils.findPolicyItemOnly;
export const findPolicyBooster = policyUtils.findPolicyBooster;

export const getPolicyItem = policyUtils.getPolicyItem;
export const getCustomBenefitItemCodeList = policyUtils.getCustomBenefitItemCodeList;

export const getCoverageKey = policyUtils.getCoverageKey;

export default policyUtils;
