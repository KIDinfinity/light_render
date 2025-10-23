import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { tenant, Region } from '@/components/Tenant';
import { getAuth } from '@/auth/Utils';

export default ({ notMatch }: any) => {
  const commonAuthorityList = useSelector(
    (state: any) => state.authController.commonAuthorityList,
    shallowEqual
  );

  return useMemo(() => {
    return tenant.region({
      [Region.ID]: true,
      [Region.TH]: !getAuth(commonAuthorityList, {
        authorityCode: 'PrimaryIDType',
      }),
      notMatch,
    });
  }, [notMatch, commonAuthorityList]);
};
