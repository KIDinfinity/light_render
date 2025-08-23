import { useCallback } from 'react';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { tenant, Region } from '@/components/Tenant';

export default ({ id }: any) => {
  const dispatch = useDispatch();
  const basicProductList = useSelector(
    (state) => state[NAMESPACE]?.planProductConfig?.basicPlanProductFeatureList
  );
  return useCallback(
    (coreCode) => {
      if (!lodash.isEmpty(coreCode) && tenant.remoteRegion() != Region.MY) {
        const value = lodash
          .chain(basicProductList)
          .find((item) => item?.productCode === coreCode)
          .get('premiumType')
          .value();

        if (!lodash.isEmpty(value)) {
          dispatch({
            type: `${NAMESPACE}/setPlanType`,
            payload: {
              id,
              changedFields: {
                policyPlanType: value,
              },
            },
          });
        }
      }
    },
    [basicProductList, id]
  );
};
