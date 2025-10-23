import { useSelector, useDispatch } from 'dva';
import { useCallback } from 'react';
import lodash from 'lodash';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import useGetCoverageList from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import { listMiscCommonHierarchy } from '@/services/pcPlanMiscCommonHierarchyControllerService';

export default (parentField: string, clientId: string) => {
  const dispatch = useDispatch();
  const coverageList = useGetCoverageList();
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.planProductConfig
  );
  const { basicPlanProductFeatureList, otherPlanProductFeatureList } = planProductConfig;

  return useCallback(
    async (occupationCode: string) => {
      const extProductTypes: any[] = [];
      const matchProducts: any[] = [];

      lodash.forEach(coverageList, (coverage) => {
        const { isMain, productCode } = coverage;
        let matchConfig;

        if (isMain === 'Y') {
          matchConfig = basicPlanProductFeatureList.find(
            (config: any) => productCode === config.productCode
          );
        } else {
          matchConfig = otherPlanProductFeatureList.find(
            (config: any) => productCode === config.productCode
          );
        }

        if (matchConfig) {
          if (['OccupationClass_ADDP', 'OccupationClass_PA'].includes(matchConfig.extProductType)) {
            extProductTypes.push(matchConfig.extProductType);
            matchProducts.push(matchConfig);
          } else {
            lodash.forEach(matchConfig.relatedRider, (rider) => {
              if (['OccupationClass_ADDP', 'OccupationClass_PA'].includes(rider.extProductType)) {
                extProductTypes.push(rider.extProductType);
                matchProducts.push(rider);
              }
            });
          }
        }

        return false;
      });

      if (matchProducts.length) {
        const result = await listMiscCommonHierarchy({
          productCodeList: matchProducts.map((item) => item.productCode),
          occupationCodeList: [occupationCode],
        });

        if (result?.success) {
          const fieldsToChange = lodash.uniq(extProductTypes).map((type: string) => {
            switch (type) {
              case 'OccupationClass_ADDP':
                return parentField === 'occupationCode'
                  ? 'addRccOccupationClass'
                  : 'addRccOccupationClassSecondary';
              case 'OccupationClass_PA':
                return parentField === 'occupationCode'
                  ? 'paOccupationClass'
                  : 'paOccupationClassSecondary';
            }

            return '';
          });

          const changedFields: any = {};

          fieldsToChange.forEach((key, index) => {
            changedFields[key] = result.resultData?.[index].subCode;
          });

          dispatch({
            type: `${NAMESPACE}/saveBackgroundInfo`,
            payload: {
              changedFields,
              id: clientId,
            },
          });
        }
      }
    },
    [basicPlanProductFeatureList, clientId, coverageList, otherPlanProductFeatureList, parentField]
  );
};
