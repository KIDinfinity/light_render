import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import flatProductConfig from 'process/NewBusiness/ManualUnderwriting/_utils/flatProductConfig';
import useGetCoverageProductListForUW from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageProductList';

export default () => {
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );

  const productCodes = useGetCoverageProductListForUW();
  return useMemo(() => {
    return lodash
      .chain(flatProductConfig({ planProductConfig }))
      .filter((configItem: any) => {
        return productCodes.includes(configItem.productCode);
      })
      .some((item: any) => item.dividendInd === 'Y' || item.icpInd === 'Y')
      .value();
  }, [planProductConfig, productCodes]);
};
