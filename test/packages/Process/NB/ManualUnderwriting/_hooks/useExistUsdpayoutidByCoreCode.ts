import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const totalFundInfoList = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.businessData?.policyList?.[0]?.fundInfo?.totalFundInfoList,
    shallowEqual
  );
  const allFundConfigList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.allFundConfigList,
    shallowEqual
  );
  return useMemo(() => {
    const fundSet = new Set();
    lodash.forEach(totalFundInfoList, (fundItem) => {
      fundSet.add(fundItem?.fundCode);
    });
    return lodash
      .chain(allFundConfigList)
      .filter((fundItem) => fundItem?.usdPayoutInd === 'Y')
      .find((fundItem) => lodash.includes(Array.from(fundSet), fundItem?.fundCode))
      .value();
  }, [allFundConfigList, totalFundInfoList]);
};
