import { useMemo, useEffect } from 'react';
import { useDispatch } from 'dva';
import { tenant, Region } from '@/components/Tenant';

import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';


export default ({ id, monitorValue, currentField, defaultValue }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!monitorValue?.touched) {
      return;
    }
    if ( formUtils.queryValue(monitorValue) === 'NO') {
      dispatch({
        type: `${NAMESPACE}/saveBackgroundInfo`,
        payload: {
          changedFields: {
            [currentField]: defaultValue,
          },
          id,
        },
      });
    }
  }, [monitorValue])

  return useMemo(() => {
    return tenant.region({
      [Region.ID]: () => {
        if (formUtils.queryValue(monitorValue) !== 'NO') {
          return false;
        }
        return true;
      },
      notMatch: false,
    });
  }, [monitorValue]);
};
