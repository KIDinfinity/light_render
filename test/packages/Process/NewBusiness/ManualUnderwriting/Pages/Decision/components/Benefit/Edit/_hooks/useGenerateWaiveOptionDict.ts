import React from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import { formUtils } from 'basic/components/Form';

export default ({ coreCode }: any) => {
  const coverageList = useGetCoverageList('edit');
  const waiverProductsList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.waiverProductsList,
    shallowEqual
  );

  return React.useMemo(() => {
    const waiverProducts = lodash
      .chain(waiverProductsList)
      .filter((item: any) => {
        return item?.productCode === formUtils.queryValue(coreCode);
      })
      .value();

    if (lodash.isEmpty(waiverProducts)) return [];

    const waivePolicyGate = lodash
      .chain(waiverProducts)
      .find((waive: any) => waive.productCode === coreCode)
      .get('waivePolicy')
      .isEqual('Y')
      .value();

    if (!waivePolicyGate) {
      return lodash
        .chain(waiverProductsList)
        .filter((waive) => waive.productCode === coreCode)
        .filter(
          (waive) =>
            lodash.findIndex(
              coverageList,
              (coverage: any) => formUtils.queryValue(coverage?.coreCode) === waive.waiveProduct
            ) >= 0
        )
        .uniqBy('waiveProduct')
        .map((waiver) => {
          return {
            ...waiver,
            productName: lodash
              .chain(coverageList)
              .find(
                (coverage: any) => formUtils.queryValue(coverage?.coreCode) === waiver.waiveProduct
              )
              .get('productName')
              .value(),
          };
        })
        .value();
    }

    const excludeZeroPrem = lodash
      .chain(waiverProducts)
      .find((waive: any) => waive.productCode === coreCode)
      .get('excludeZeroPremium')
      .isEqual('Y')
      .value();

    const excludeSelf = lodash
      .chain(waiverProducts)
      .find((waive: any) => waive.productCode === coreCode)
      .get('excludeSelf')
      .isEqual('Y')
      .value();
    if (excludeSelf && !excludeZeroPrem) {
      return lodash
        .chain(coverageList)
        .uniqBy('productCode')
        .filter((coverage: any) => formUtils.queryValue(coverage?.coreCode) !== coreCode)
        .map((coverage) => ({
          waiveProduct: coverage.productCode,
          productName: coverage.productName,
        }))
        .value();
    }
    if (excludeZeroPrem && !excludeSelf) {
      return lodash
        .chain(coverageList)
        .filter(
          (coverage: any) => coverage.grossPremium > 0 && coverage.instalmentPremiumWithTax > 0
        )
        .uniqBy('productCode')
        .map((coverage) => ({
          waiveProduct: coverage.productCode,
          productName: coverage.productName,
        }))
        .value();
    }
    if (excludeZeroPrem && excludeSelf) {
      return lodash
        .chain(coverageList)
        .filter((coverage: any) => formUtils.queryValue(coverage?.coreCode) !== coreCode)
        .filter(
          (coverage: any) => coverage.grossPremium > 0 && coverage.instalmentPremiumWithTax > 0
        )
        .uniqBy('productCode')
        .map((coverage) => ({
          waiveProduct: formUtils.queryValue(coverage?.coreCode),
          productName: coverage.productName,
        }))
        .value();
    }
    return lodash
      .chain(coverageList)
      .uniqBy('productCode')
      .map((coverage) => ({
        waiveProduct: formUtils.queryValue(coverage?.coreCode),
        productName: coverage.productName,
      }))
      .value();
  }, [coreCode, waiverProductsList, coverageList]);
};
