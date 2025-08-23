import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { tenant, Region } from '@/components/Tenant';
import { NAMESPACE } from '../activity.config';

export default ({ addressLevel, formData }: any) => {
  const regionCode = tenant.region();

  const address = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.address,
    shallowEqual
  );

  return useMemo(() => {
    const addressLevelKeyMapping = (() => {
      if ([Region.MY].includes(regionCode)) {
        return {
          country: 'countryCode',
          province: 'addressLine5',
        };
      }
      return {
        country: 'addressLine5',
        province: 'addressLine4',
        city: 'addressLine3',
      };
    })();

    const addressChildMapping = (() => {
      if (regionCode === Region.MY) {
        return {
          country: 'province',
          province: 'city',
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
    const parentAddressCode = formUtils.queryValue(
      lodash.chain(formData).get(addressLevelKeyMapping[parentAddressLevel]).value()
    );
    let currentLevelAddress = lodash.chain(address).get(addressLevel).value();

    if (parentAddressCode) {
      currentLevelAddress = lodash.chain(currentLevelAddress).get(parentAddressCode, []).value();
    }

    return currentLevelAddress;
  }, [address, formData, addressLevel, regionCode]);
};
