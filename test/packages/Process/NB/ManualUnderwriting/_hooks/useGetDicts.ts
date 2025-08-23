import { useEffect } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { tenant, Region } from '@/components/Tenant';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ parentCode, parentFieldName, id, field, syncChangeValue, effect }: any) => {
  const dispatch = useDispatch();
  const dicts = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.linkDicts[`${parentFieldName}-${parentCode}`],
    shallowEqual
  );
  useEffect(() => {
    tenant.region({
      [Region.ID]: async () => {
        const resultData = await dispatch({
          type: `${NAMESPACE}/getLinkDicts`,
          payload: { parentCode, parentFieldName, id, field, syncChangeValue, effect },
        });
        if (syncChangeValue && Array.isArray(resultData)) {
          await dispatch({
            type: `${NAMESPACE}/${effect}`,
            payload: {
              changedFields: {
                [field]: resultData?.[0]?.dictCode,
              },
              id,
            },
          });
        }
      },

      notMatch: null,
    });
  }, [parentCode, parentFieldName]);
  return dicts || [];
};
