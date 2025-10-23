import { useMemo } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { tenant, Region } from '@/components/Tenant';

export default ({ id, monitorValue, currentField, defaultValue }: any) => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return tenant.region({
      [Region.ID]: () => {
        if (monitorValue !== 'NO') {
          return null;
        }
        dispatch({
          type: `${NAMESPACE}/changeBasicInfoFields`,
          payload: {
            changedFields: {
              [currentField]: defaultValue,
            },
            id,
          },
        });
        return true;
      },
      notMatch: null,
    });
  }, [monitorValue]);
};
