import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import flatProductConfig from 'process/NB/ManualUnderwriting/utils/flatProductConfig';
import useGetCoverageProductList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageProductList';

export default () => {
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );

  const productCodes = useGetCoverageProductList();
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
