import { useSelector } from 'dva';
import { useMemo } from 'react';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import lodash from 'lodash';

export default () => {
  const productCodeList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.productCodeList
  );
  const hasFundTypeD = useMemo(() => {
    return lodash.some(
      productCodeList,
      (productCode) => productCode.cfgPlanFundBOS && productCode.cfgPlanFundBOS.length > 0
    );
  }, [productCodeList]);
  return hasFundTypeD;
};
