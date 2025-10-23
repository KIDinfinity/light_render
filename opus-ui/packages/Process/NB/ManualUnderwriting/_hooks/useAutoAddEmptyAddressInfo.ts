import { useMemo } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import useGetAddressInfoList from 'process/NB/ManualUnderwriting/_hooks/useGetAddressInfoList';
import useGetAddrTypeDictsByRole from 'process/NB/ManualUnderwriting/_hooks/useGetAddrTypeDictsByRole';
import dropEmptyData from 'process/NB/ManualUnderwriting/utils/dropEmptyData';
import { NAMESPACE } from '../activity.config';

export default ({ id }: any) => {
  const dispatch = useDispatch();
  const addressInfoList = useGetAddressInfoList({ id });
  const notExistingAddressType = useGetAddrTypeDictsByRole({ id });
  return useMemo(() => {
    const haveEmptyAddressInfo = lodash.find(addressInfoList, (item) => {
      return dropEmptyData({ objItem: item, loseFileds: ['id', 'communicationLane', 'addrType'] });
    });
    const haveAllEmptyAddressInfo = lodash.find(addressInfoList, (item) => {
      return dropEmptyData({ objItem: item, loseFileds: ['id', 'communicationLane'] });
    });
    if (!haveEmptyAddressInfo && !lodash.isEmpty(notExistingAddressType)) {
      dispatch({
        type: `${NAMESPACE}/autoAddEmptyAddressInfo`,
        payload: {
          id,
        },
      });
    } else if (haveAllEmptyAddressInfo && lodash.isEmpty(notExistingAddressType)) {
      dispatch({
        type: `${NAMESPACE}/autoDeleteEmptyAddressInfo`,
        payload: {
          id,
          addressInfoId: lodash.get(haveAllEmptyAddressInfo, 'id'),
        },
      });
    }
  }, [addressInfoList, id, notExistingAddressType, dispatch]);
};
