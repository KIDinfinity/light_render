import { useEffect } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { tenant, Region } from '@/components/Tenant';

export default ({ id, monitorValue, currentField, defaultValue, readOnly }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (readOnly) return
    tenant.region({
      [Region.ID]: () => {
        if (lodash.isNil(monitorValue)) {
          dispatch({
            type: `${NAMESPACE}/saveFinancialInfo`,
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
