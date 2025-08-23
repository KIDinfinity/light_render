import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default (currentFundCode: any) => {
  const totalFundInfoList = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.businessData?.policyList?.[0]?.fundInfo?.totalFundInfoList,
    shallowEqual
  ) || [];
  const productCodeList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.productCodeList,
    shallowEqual
  );
  return useMemo(() => {
    return lodash
      .chain(productCodeList)
      .filter((productCode: any) => {
        if (productCode?.fundCode === formUtils.queryValue(currentFundCode)) {
          return true;
        }
        const fundCodeList = lodash.map(totalFundInfoList, (item: any) => formUtils.queryValue(item?.fundCode));
        return !lodash.includes(fundCodeList, productCode?.fundCode);
      })
      .map((productCode: any) => {
        return {
          ...productCode,
          fundName: `${productCode.fundCode} - ${productCode.fundName}`,
        };
      })
      .value();
  }, [productCodeList, totalFundInfoList, currentFundCode]);
};
