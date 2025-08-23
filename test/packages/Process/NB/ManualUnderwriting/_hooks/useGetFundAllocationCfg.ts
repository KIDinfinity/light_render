import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { getPlanFundAllocationCfg } from 'process/NB/ManualUnderwriting/utils/fundUtils';
import { useMemo } from 'react';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export default (field: string, fundCode: string) => {
  const productCodeList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.productCodeList,
    shallowEqual
  );
  const coverageList = useSelector(
    (state: any) => state?.manualUnderwriting?.businessData?.policyList?.[0]?.coverageList,
    shallowEqual
  );
  const portfolioType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.businessData?.policyList?.[0]?.fundInfo?.portfolioType
  );

  const allocationVisibleByCondition = {
    fundAllocation: (coverageItem: any) => coverageItem.isMain === 'Y',
    epaAllocation: (coverageItem: any) => coverageItem.productType === 'RT',
    adHocTopUpAllocation: (coverageItem: any) => coverageItem.productType === 'AT',
  };

  const allocationCfg = useMemo(() => {
    const coverage = lodash.find(coverageList, (coverageItem) => {
      if (lodash.has(allocationVisibleByCondition, field)) {
        return allocationVisibleByCondition[field](coverageItem);
      }
      return false;
    });

    return getPlanFundAllocationCfg(
      formUtils.queryValue(fundCode),
      formUtils.queryValue(portfolioType),
      productCodeList,
      coverage
    );
  }, [portfolioType, fundCode, productCodeList, field, coverageList]);
  return allocationCfg;
};
