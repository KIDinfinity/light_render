import { useMemo } from 'react';
import {  useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetRoleListById from 'process/NB/ManualUnderwriting/_hooks/useGetRoleListById';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import CustomerRole from 'process/NB/Enum/CustomerRole';

export default ({ id }: any) => {
  const dispatch = useDispatch();
  const relationOfProposerDefaultvalue = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.relationOfProposerDefaultvalue,
    shallowEqual
  );
  const roleList = useGetRoleListById({ id });
  const customerRoleList = lodash.map(roleList, (role) => role.customerRole);

  useMemo(() => {
    if (
      lodash.includes(customerRoleList, CustomerRole.PolicyOwner) &&
      !lodash.isEmpty(relationOfProposerDefaultvalue)
    ) {
      dispatch({
        type: `${NAMESPACE}/changeBasicInfoFields`,
        payload: {
          id,
          changedFields: {
            relationOfProposer: relationOfProposerDefaultvalue,
          },
        },
      });
    }
  }, [id, customerRoleList, dispatch, relationOfProposerDefaultvalue]);
};
