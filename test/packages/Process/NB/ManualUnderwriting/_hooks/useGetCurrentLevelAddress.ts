import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { tenant, Region } from '@/components/Tenant';
import AddressType from 'process/NB/ManualUnderwriting/Enum/AddressType';
import useGetAddressInfoList from 'process/NB/ManualUnderwriting/_hooks/useGetAddressInfoList';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetPolicyAddressInfoList from 'process/NB/ManualUnderwriting/_hooks/useGetPolicyAddressInfoList';

export default ({ id, addressType, addressLevel }: any) => {
  const regionCode = tenant.region();
  const address = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.address,
    shallowEqual
  );
  const currentAddressList = useGetAddressInfoList({ id });
  const addressInfoList = useGetPolicyAddressInfoList({ id });
  return useMemo(() => {
    const addressLevelKeyMapping = {
      country:
        [
          AddressType.Business,
          AddressType.Current,
          AddressType.Residence,
          AddressType.Identity,
        ].includes(addressType) || !addressType
          ? 'country'
          : 'address7',
      province: 'address6',
      city: 'address5',
      district: 'address4',
      commune: 'address3',
      village: 'address',
      street: 'address1',
    };
    const policyAddressKeyMapping = {
      country: 'countryCode',
      province: 'addressLine6',
      city: 'addressLine5',
      district: 'addressLine4',
      commune: 'addressLine3',
      village: 'addressLine2',
      street: 'addressLine1',
    };
    const addressChildMapping = (() => {
      if (regionCode === Region.ID) {
        return {
          country: 'province',
          province: 'city',
          // city: 'zipCode',
        };
      }
      if (regionCode === Region.PH) {
        return {
          country: 'province',
          province: 'city',
          city: 'zipCode',
        };
      }
      if (regionCode === Region.VN) {
        return {
          country: 'city',
          city: 'district',
          district: 'commune',
          commune: 'village',
          village: 'street',
        };
      }
      if (regionCode === Region.KH) {
        return {
          country: 'province',
          province: 'district',
          district: 'commune',
          commune: 'village',
          village: 'street',
        };
      }
      return {
        country: 'province',
        province: 'district',
        district: 'commune',
        commune: 'village',
        village: 'street',
      };
    })();
    const parentAddressLevel = lodash.findKey(addressChildMapping, (e) => e === addressLevel) || '';
    let parentAddressCode;
    if (addressType === AddressType.Policy) {
      parentAddressCode = formUtils.queryValue(
        lodash.chain(addressInfoList).get(policyAddressKeyMapping[parentAddressLevel]).value()
      );
    } else {
      parentAddressCode = formUtils.queryValue(
        lodash
          .chain(currentAddressList)
          .find((item) => formUtils.queryValue(item?.addrType) === addressType)
          .get(addressLevelKeyMapping[parentAddressLevel])
          .value()
      );
    }
    const currentLevelAddress = lodash
      .chain(address)
      .get(addressLevel)
      .get(parentAddressCode, [])
      .value();
    return currentLevelAddress;
  }, [addressType, address, addressLevel, regionCode, addressInfoList, currentAddressList]);
};
