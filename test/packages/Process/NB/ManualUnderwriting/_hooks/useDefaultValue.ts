import { useEffect } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { tenant, Region } from '@/components/Tenant';

export default ({ id, monitorValue, currentField, defaultValue }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    tenant.region({
      [Region.ID]: () => {
        if (lodash.isNil(monitorValue)) {
          dispatch({
            type: `${NAMESPACE}/changeBasicInfoFields`,
            payload: {
              changedFields: {
                [currentField]: defaultValue,
              },
              id,
            },
          });
        }
      },
      notMatch: null,
    });
  }, [monitorValue]);
};
