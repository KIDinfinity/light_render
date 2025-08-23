import DistributionChannelDisplayMethod from 'process/NewBusiness/Enum/DistributionChannelDisplayMethod';
import { useEffect } from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import { tenant } from '@/components/Tenant';
import { NAMESPACE } from '../activity.config';

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
