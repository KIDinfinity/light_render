import { useEffect } from 'react';
import { useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { tenant, Region } from '@/components/Tenant';

export default ({ id }: any) => {
  const dicts = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.occupationCodeDicts,
    shallowEqual
  );
  const regionCode = tenant.region();
  const dispatch = useDispatch();
  useEffect(() => {
    if (lodash.isArray(dicts) && regionCode !== Region.MY) {
      const occupationCode = lodash.get(dicts, '[0].dictCode', '');
      dispatch({
        type: `${NAMESPACE}/changeBasicInfoFields`,
        payload: {
          changedFields: {
            occupationCode,
          },
          id,
        },
      });
    }
  }, [dicts, id]);
};
