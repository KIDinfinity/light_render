import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList.ts';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const planExtraPremiumLoadingRulesConfigs = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.planExtraPremiumLoadingRulesConfigs,
    shallowEqual
  );
  const coverageList = useGetCoverageList();

  return useMemo(() => {
    return lodash.reduce(
      coverageList,
      (list, item) => {
        const loadingRule = lodash.find(
          planExtraPremiumLoadingRulesConfigs,
          (config: any) => config?.productCode === item?.coreCode
        );

        if (loadingRule?.addLoading === 'N' || item.loadingRule?.addLoading === 'N') {
          return [...list, loadingRule?.productCode];
        }
        return list;
      },
      []
    );
  }, [coverageList]);
};
