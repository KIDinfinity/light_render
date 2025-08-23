import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ item, id }: any) => {
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
    let newItem = item;
    const addressItem = lodash.find(
      addressList,
      (dataItem: any) => formUtils.queryValue(dataItem?.addrType) === defaultCurrentAddressType
    );
    if (lodash.isPlainObject(addressItem)) {
      lodash
        .chain(addressItem)
        .entries()
        .forEach(([key, value]: any) => {
          const reg = /(address[1-6])|(zipCode)|(fullAddress)|(country)/;
          if (reg.test(key)) {
            const field = key === 'country' ? 'country' : `current${lodash.upperFirst(key)}`;
            newItem = {
              ...newItem,
              [field]: value,
            };
          }
        })
        .value();
    }
    return newItem;
  }, [item, defaultCurrentAddressType, addressList]);
};
