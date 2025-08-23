import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import { formUtils } from 'basic/components/Form';
import type BenefitLevelDecision from 'process/NewBusiness/Enum/BenefitLevelDecision';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';

type valueof<T> = T[keyof T];

export default (uwTypes: valueof<BenefitLevelDecision>[] = ['NS']) => {
  const coverageList = useGetCoverageList();
  const addingLoadingSelectedProduct = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.addingLoadingSelectedProduct,
    shallowEqual
  );
  return useMemo(() => {
    const IdSet = new Set();
    const productName = formUtils.queryValue(addingLoadingSelectedProduct?.productName);
    lodash
      .chain(coverageList)
      .filter((item: any) => {
        return uwTypes.includes(formUtils.queryValue(item?.coverageDecision?.uwDecision));
      })
      .filter((item: any) => {
        if (productName) {
          if (lodash.isArray(productName) && !lodash.isEmpty(productName)) {
            return lodash.includes(productName, formUtils.queryValue(item?.coreCode));
          }
          if (lodash.isString(productName)) {
            return productName === formUtils.queryValue(item?.coreCode);
          }
        }
        return true;
      })
      .forEach((coverage: any) => {
        lodash
          .chain(coverage)
          .get('coverageInsuredList', [])
          .forEach((insuredItem: any) => {
            IdSet.add(insuredItem?.clientId);
          })
          .value();
      })
      .value();

    return Array.from(IdSet);
  }, [addingLoadingSelectedProduct?.productName, coverageList, uwTypes]);
};
