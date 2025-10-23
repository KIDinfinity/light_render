import { useCallback } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from '../activity.config';

export default () => {
  const coverageList = useSelector(
    (state: any) => state?.manualUnderwriting?.businessData?.policyList?.[0]?.coverageList,
    shallowEqual
  );
  const totalFundInfoList =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) =>
        modelnamespace.businessData?.policyList?.[0]?.fundInfo?.totalFundInfoList,
      shallowEqual
    ) || [];
  const AllocationVisibleByCondition = {
    fundAllocation: () => {
      return lodash.some(coverageList, (item) => item.isMain === 'Y');
    },
    tpaAllocation: () => {
      return lodash.some(totalFundInfoList, (item) => !lodash.isNil(item.tpaAllocation));
    },
    tpaRcdAllocation: () => {
      return lodash.some(totalFundInfoList, (item) => item.fundCode === 'VI07');
    },
    epaAllocation: () => lodash.some(coverageList, (item) => item.productType === 'RT'),
    adHocTopUpAllocation: () => lodash.some(coverageList, (item) => item.productType === 'AT'),
    fundCode: () => status === 'title',
    fundCurrency: () => status === 'title',
  };
  return useCallback(
    (field: any) => {
      if (lodash.has(AllocationVisibleByCondition, field)) {
        return AllocationVisibleByCondition?.[field]();
      }
    },
    [coverageList]
  );
};
