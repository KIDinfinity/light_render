import { useEffect } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import AddressType from 'process/NB/ManualUnderwriting/Enum/AddressType';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import ClientAddress from 'process/NB/Enum/ClientAddress';

export default ({ businessData }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getAddressSubList`,
    });
  }, []);

  useEffect(() => {
    const list = lodash.get(businessData, 'policyList[0].clientInfoList', []);
    const policyAddressList = lodash
      .chain(businessData)
      .get('policyList[0].policyAddressList[0]')
      .value();
    const addressLevelKeyMapping = {
      address7: 'country',
      address6: 'province',
      address5: 'city',
      address4: 'district',
      address3: 'commune',
      address2: 'village',
      address1: 'street',
      'zip code': 'zipCode',
    };
    const addressDropdownInit = () => {
      const addressSet = new Set();
      {
        lodash
          .chain(list)
          .map('addressList')
          .forEach((listItem: any) => {
            const listAddress = lodash.map(listItem, (addressList: any) => {
              if (
                [AddressType.Business, AddressType.Current, AddressType.Residence].includes(
                  addressList?.addrType
                ) &&
                addressList?.country
              ) {
                const { country, address6, address5, address4 } = lodash.pick(addressList, [
                  ClientAddress.country,
                  ClientAddress.address6,
                  ClientAddress.address5,
                  ClientAddress.address4,
                ]);
                addressSet.add(country);
                addressSet.add(address6);
                addressSet.add(address5);
                addressSet.add(address4);
              }
              if (
                ![AddressType.Business, AddressType.Current, AddressType.Residence].includes(
                  addressList?.addrType
                ) &&
                addressList?.address7
              ) {
                const { address7, address6, address5, address4 } = lodash.pick(addressList, [
                  ClientAddress.address7,
                  ClientAddress.address6,
                  ClientAddress.address5,
                  ClientAddress.address4,
                ]);

                addressSet.add(address7);
                addressSet.add(address6);
                addressSet.add(address5);
                addressSet.add(address4);
              }
            });
            return listAddress;
          })
          .value();
      }
      {
        const {
          addressLine7,
          addressLine6,
          addressLine5,
          addressLine4,
          addressLine3,
        } = lodash.pick(policyAddressList, [
          ClientAddress.addressLine7,
          ClientAddress.addressLine6,
          ClientAddress.addressLine5,
          ClientAddress.addressLine4,
          ClientAddress.addressLine3,
        ]);
        addressSet.add(addressLine7);
        addressSet.add(addressLine6);
        addressSet.add(addressLine5);
        addressSet.add(addressLine4);
        addressSet.add(addressLine3);
      }

      console.log('addressSet', addressSet);
      lodash.forEach(Array.from(addressSet), async (addressListItem: any) => {
        const response = await dispatch({
          type: `${NAMESPACE}/getAddressSubList`,
          payload: {
            parentCode: addressListItem,
          },
        });
        if (!lodash.isEmpty(response)) {
          const addressLevel = lodash.get(addressLevelKeyMapping, response[0]?.subFieldName);
          dispatch({
            type: `${NAMESPACE}/setAddress`,
            payload: {
              parentCode: addressListItem,
              addressLevel,
              addressSubList: response,
            },
          });
        }
      });
    };

    window.requestIdleCallback(() => {
      addressDropdownInit();
    });
  }, [dispatch, businessData]);
};
