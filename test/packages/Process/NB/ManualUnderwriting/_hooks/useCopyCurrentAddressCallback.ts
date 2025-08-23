import { useCallback } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import useGetAddressInfoList from 'process/NB/ManualUnderwriting/_hooks/useGetAddressInfoList';
import useGetAddrTypeDictsByRole from 'process/NB/ManualUnderwriting/_hooks/useGetAddrTypeDictsByRole';
import { NAMESPACE } from '../activity.config';

export default ({ id }: any) => {
  const dispatch = useDispatch();
  const addressInfoList = useGetAddressInfoList({ id });
  const notExistingAddressType = useGetAddrTypeDictsByRole({ id });

  return useCallback(
    ({ addressItemId }: any) => {
      const addressItem = lodash.find(addressInfoList, (item: any) => item.id === addressItemId);
      dispatch({
        type: `${NAMESPACE}/copyAddressItem`,
        payload: {
          id,
          addressItem,
          notExistingAddressType,
        },
      });
    },
    [id, addressInfoList, notExistingAddressType]
  );
};
