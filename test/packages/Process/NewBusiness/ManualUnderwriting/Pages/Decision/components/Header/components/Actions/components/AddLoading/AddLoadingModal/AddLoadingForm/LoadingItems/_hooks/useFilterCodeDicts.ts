import { useEffect, useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList.ts';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default ({ dicts, coverageId }: any) => {
  const dispatch = useDispatch();
  const coverageList = useGetCoverageList();
  const planLoadingReasons = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planLoadingReasons,
    shallowEqual
  );
  const productName = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.addingLoadingSelectedProduct.productName,
    shallowEqual
  );

  const currecoverageList = lodash
    .chain(coverageList)
    .find((item: any) => item?.id === coverageId)
    .get('productCode')
    .value();

  useEffect(() => {
    if (lodash.isEmpty(planLoadingReasons)) {
      dispatch({
        type: `${NAMESPACE}/getPlanLoadingReasons`,
      });
    }
  }, []);

  return useMemo(() => {
    const loadingReasons = lodash
      .chain(planLoadingReasons)
      .filter(
        (item: any) =>
          lodash.includes(productName, item.productCode) ||
          item.productCode === formUtils.queryValue(currecoverageList)
      )
      .reduce((result, item) => {
        return {
          ...result,
          ...lodash.get(item, 'loadingReasons'),
        };
      }, [])
      .value();

    if (!lodash.isEmpty(loadingReasons)) {
      return lodash
        .chain(dicts)
        .filter((item) => {
          return lodash.includes(loadingReasons, item?.dictCode);
        })
        .value();
    } else {
      return dicts;
    }
  }, [planLoadingReasons, productName, dicts, currecoverageList]);
};
