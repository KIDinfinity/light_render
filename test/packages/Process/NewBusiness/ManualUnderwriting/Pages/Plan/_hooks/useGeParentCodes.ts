import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import AddressType from 'process/NewBusiness/ManualUnderwriting/_enum/AddressType';

// TODO：弹窗的时候才处理?
export default () => {
  const dispatch = useDispatch();

  const addressInfoMap =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.entities?.addressInfoMap
    ) || {};

  const parentCodeAddress =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.parentCodeAddress) || {};

  const parentCodes = useMemo(() => {
    return lodash
      .chain(lodash.values(addressInfoMap) || [])
      .reduce((arr: any, addressItem: any) => {
        const isBCR = [AddressType.Business, AddressType.Current, AddressType.Residence].includes(
          addressItem?.addrType
        );

        let newArr: any = [];

        if (!!isBCR && addressItem?.country) {
          newArr =
            lodash
              .chain(addressItem)
              .pick(['country', 'address6', 'address5', 'address4'])
              .reduce((arr: any, el: any) => {
                return !!el ? [...arr, el] : arr;
              }, [])
              .values()
              .value() || [];
        }
        if (!isBCR && addressItem?.address7) {
          newArr =
            lodash
              .chain(addressItem)
              .pick(['address4', 'address5', 'address6', 'address7'])
              .reduce((arr: any, el: any) => {
                return !!el ? [...arr, el] : arr;
              }, [])
              .values()

              .value() || [];
        }

        return lodash
          .chain([...arr, ...newArr])
          .uniq()
          .value();
      }, [])
      .value();
  }, [addressInfoMap]);

  useEffect(() => {
    lodash.forEach(Array.from(parentCodes), async (parentCode: any) => {
      // 防止重复请求 TODO
      // if (!parentCodeAddress?.[parentCode]) {
      //   const response = await dispatch({
      //     type: `${NAMESPACE}/getAddressSubListV2`,
      //     payload: {
      //       parentCode: parentCode,
      //     },
      //   });
      //   if (!lodash.isEmpty(response)) {
      //     const addressLevel = lodash.get(
      //       {
      //         address7: 'country',
      //         address6: 'province',
      //         address5: 'city',
      //         address4: 'district',
      //         address3: 'commune',
      //         address2: 'village',
      //         address1: 'street',
      //         'zip code': 'zipCode',
      //       },
      //       response[0]?.subFieldName
      //     );
      //     dispatch({
      //       type: `${NAMESPACE}/saveParentCodeAddress`,
      //       payload: {
      //         parentCode: parentCode,
      //         addressLevel,
      //         list: response,
      //       },
      //     });
      //   }
      // }
    });
  }, [parentCodes]);
};
