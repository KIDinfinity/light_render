import { useMemo } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import { tenant } from '@/components/Tenant';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ data, id }: any) => {
  const list = useGetClientDetailList();
  const regionCode = tenant.region();
  const defaultCurrentAddressType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.defaultCurrentAddressType,
    shallowEqual
  );
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  const addressList = useMemo(() => {
    return lodash
      .chain(businessData)
      .get('policyList[0].clientInfoList', [])
      .find((clientItem: any) => clientItem.id === id)
      .get('addressList', [])
      .value();
  }, [businessData]);
  return useMemo(() => {
    const addressItem = lodash.find(
      addressList,
      (dataItem: any) => dataItem?.addrType === defaultCurrentAddressType
    );
    const { country: primaryCountry, secondaryContactCountry } = lodash
      .chain(list)
      .find((item: any) => item?.id === id)
      .pick(['country', 'secondaryContactCountry'])
      .value();
    return lodash.map(data, (item) => {
      if (['phoneNoReadOnly', 'secondaryContactNo'].includes(item.key)) {
        const country = item.key === 'phoneNoReadOnly' ? primaryCountry : secondaryContactCountry;
        if (lodash.isEmpty(country) && !lodash.isEmpty(item.value)) {
          return {
            ...item,
            value: item.value,
          };
        }
        if (!lodash.isEmpty(country) && lodash.isEmpty(item.value)) {
          return {
            ...item,
            value: country,
          };
        }
        if (!lodash.isEmpty(country) && !lodash.isEmpty(item.value)) {
          return {
            ...item,
            value:
              item.key === 'phoneNoReadOnly'
                ? `${country}${item.value}`
                : lodash.map(country, (countryCode: any, index: any) => {
                    return `${countryCode}${item.value[index]}`;
                  }),
          };
        }
      }
      if (item.key === 'currentAddress') {
        return {
          ...item,
          value: lodash.get(addressItem, 'fullAddress'),
        };
      }
      if (item.key === 'currentZipCode') {
        return {
          ...item,
          value: lodash.get(addressItem, 'zipCode'),
        };
      }
      return item;
    });
  }, [data, id, list, regionCode]);
};
