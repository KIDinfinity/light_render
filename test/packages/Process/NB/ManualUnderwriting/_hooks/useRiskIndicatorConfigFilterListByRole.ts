import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetRoleListById from 'process/NB/ManualUnderwriting/_hooks/useGetRoleListById';
import { NAMESPACE } from '../activity.config';

export default ({ id }: any) => {
  const riskIndicatorConfigList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData?.riskIndicatorConfigList,
    shallowEqual
  );
  const roleList = useGetRoleListById({ id });
  const customerRoleList = lodash.map(roleList, (role) => role.customerRole);
  return useMemo(() => {
    return (
      lodash
        .chain(riskIndicatorConfigList)
        .filter((item: any) => {
          return lodash.find(customerRoleList, (role) =>
            lodash.includes(item?.customerRoleList, role)
          );
        })
        .value()
    );
  }, [riskIndicatorConfigList, customerRoleList]);
};
