import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import useGetCoverageList from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';

export default (type: string) => {
  const coverageList = useGetCoverageList();
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.planProductConfig
  );
  const { basicPlanProductFeatureList, otherPlanProductFeatureList } = planProductConfig;

  return useMemo(() => {
    return lodash.some(coverageList, (coverage) => {
      const { isMain, productCode } = coverage;
      let matchConfig: any;

      if (isMain === 'Y') {
        matchConfig = basicPlanProductFeatureList.find(
          (config: any) => productCode === config.productCode
        );
      } else {
        matchConfig = otherPlanProductFeatureList.find(
          (config: any) => productCode === config.productCode
        );

        if (!matchConfig) {
          basicPlanProductFeatureList.some((config: any) => {
            if (productCode === config.productCode) {
              matchConfig = config;
            } else {
              config.relatedRider?.some((riderConfig: any) => {
                if (productCode === riderConfig.productCode) {
                  matchConfig = riderConfig;
                }

                return !!matchConfig;
              });
            }

            return !!matchConfig;
          });

          otherPlanProductFeatureList.some((config: any) => {
            if (productCode === config.productCode) {
              matchConfig = config;
            } else {
              config.relatedRider?.some((riderConfig: any) => {
                if (productCode === riderConfig.productCode) {
                  matchConfig = riderConfig;
                }

                return !!matchConfig;
              });
            }

            return !!matchConfig;
          });
        }
      }

      if (matchConfig) {
        return matchConfig.extProductType === type;
      }

      return false;
    });
  }, [basicPlanProductFeatureList, coverageList, otherPlanProductFeatureList, type]);
};
