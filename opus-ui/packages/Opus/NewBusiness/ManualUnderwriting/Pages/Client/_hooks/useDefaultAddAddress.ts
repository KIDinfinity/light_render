import { useEffect } from 'react';
import useGetAddressIdByType from './useGetAddressIdByType';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import type { AddressType } from 'opus/NewBusiness/ManualUnderwriting/_enum';

interface IParams {
  clientId: string;
  type: AddressType;
}

export default ({ clientId, type }: IParams) => {
  const dispatch = useDispatch();
  const businessAddressId = useGetAddressIdByType({
    clientId,
    mode: 'edit',
    type,
  });

  useEffect(() => {
    if (!businessAddressId) {
      dispatch({
        type: `${NAMESPACE}/addAddressInfo`,
        payload: {
          id: clientId,
          changedValues: { addrType: type, country: 'TH' },
        },
      });
    }
  }, [type, businessAddressId, clientId]);
};
