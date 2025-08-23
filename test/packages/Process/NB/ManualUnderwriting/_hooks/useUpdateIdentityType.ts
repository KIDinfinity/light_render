import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { tenant, Region } from '@/components/Tenant';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ nationality, customerAge, id }: any) => {
  const dispatch = useDispatch();

  return useEffect(() => {
    tenant.region({
      [Region.ID]: () => {
        const changedFields = { identityType: '' };
        if (nationality === 'RI') {
          if (customerAge < 18) {
            changedFields.identityType = 'BC';
          } else {
            changedFields.identityType = 'ID';
          }
        } else {
          changedFields.identityType = 'PP';
        }
        dispatch({
          type: `${NAMESPACE}/handleChangePersaonalFields`,
          payload: {
            changedFields,
            id,
          },
        });
      },
      notMatch: null,
    });
  }, [nationality, customerAge]);
};
