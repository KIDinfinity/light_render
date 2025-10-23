import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { useMemo } from 'react';
import type { AddressType } from 'opus/NewBusiness/ManualUnderwriting/_enum';
import { formUtils } from 'basic/components/Form';

interface IParams {
  mode: 'edit' | 'show';
  clientId: string;
  type: AddressType;
}

export default ({ clientId, mode, type }: IParams) => {
  const addressInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        `${mode === 'edit' ? 'modalData.' : ''}entities.clientMap.${clientId}.addressInfoList`,
        []
      ),
    shallowEqual
  );

  const addressInfoMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        `${mode === 'edit' ? 'modalData.' : ''}entities.addressInfoMap`,
        []
      ),
    shallowEqual
  );

  return useMemo(() => {
    return lodash.find(addressInfoList, (id) => {
      const addrType = formUtils.queryValue(addressInfoMap[id]?.addrType);
      return !addrType || addrType === type;
    });
  }, [addressInfoList, addressInfoMap, type]);
};
