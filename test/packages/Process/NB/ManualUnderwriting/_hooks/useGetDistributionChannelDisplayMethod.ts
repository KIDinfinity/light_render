import { useDispatch, useSelector } from 'dva';
import { useEffect } from 'react';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';
import { tenant } from '@/components/Tenant';
import DistributionChannelDisplayMethod from 'process/NB/Enum/DistributionChannelDisplayMethod';

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getDistributionChannelDisplayMethod`,
      payload: {
        region: tenant.region(),
      },
    });
  }, []);

  return useSelector((state) =>
    lodash.get(
      state,
      `${NAMESPACE}.distributionChannelDisplayMethod`,
      DistributionChannelDisplayMethod.AC
    )
  );
};
