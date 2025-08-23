import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const coverageList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.coverageList,
    shallowEqual
  );
  const allFundConfigList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.allFundConfigList,
    shallowEqual
  );

  const fundCodeList = lodash
    .chain(coverageList)
    .reduce((arr: any, { coverageFundInfoList }: any) => {
      return [
        ...arr,
        ...lodash.map(
          coverageFundInfoList?.[0]?.ownFundInfoList || [],
          ({ fundCode }: any) => fundCode
        ),
      ];
    }, [])
    .value();
  return useMemo(() => {
    return lodash
      .chain(allFundConfigList)
      .filter(({ usdPayoutInd }: any) => usdPayoutInd === 'Y')
      .find((fundItem) => lodash.includes(fundCodeList, fundItem?.fundCode))
      .value();
  }, [allFundConfigList, fundCodeList]);
};
