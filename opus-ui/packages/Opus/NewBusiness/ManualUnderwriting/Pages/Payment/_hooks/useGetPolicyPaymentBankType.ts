import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import useGetCoverageProductListForUW from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageProductList';
import flatProductConfig from 'opus/NewBusiness/ManualUnderwriting/_utils/flatProductConfig';
import BankInfoType from 'opus/NewBusiness/Enum/BankInfoType';

export default () => {
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );

  const productCodes = useGetCoverageProductListForUW();

  return useMemo(() => {
    const hasIcp = lodash
      .chain(flatProductConfig({ planProductConfig }))
      .filter((configItem: any) => {
        return productCodes.includes(configItem.productCode);
      })
      .some((item: any) => item.icpInd === 'Y')
      .value();
    const hasDividendInd = lodash
      .chain(flatProductConfig({ planProductConfig }))
      .filter((configItem: any) => {
        return productCodes.includes(configItem.productCode);
      })
      .some((item: any) => item.dividendInd === 'Y')
      .value();

    const type = (() => {
      if (hasIcp) {
        return BankInfoType.IcpPay;
      }
      if (hasDividendInd) {
        return BankInfoType.Dividend;
      }
      return BankInfoType.ICPDividend;
    })();
    return type;
  }, [productCodes, planProductConfig]);
};
