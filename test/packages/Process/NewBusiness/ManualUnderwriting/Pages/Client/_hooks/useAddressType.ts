import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetCustomerType from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCustomerType';

const useFilterAddrTypeDicts = ({ readOnly, id }: any) => {
  const customerRole = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly
          ? `entities.clientMap.${id}.personalInfo.customerRole`
          : `modalData.entities.clientMap.${id}.personalInfo.customerRole`
      ),
    shallowEqual
  );
  const customerType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly
          ? `entities.clientMap.${id}.personalInfo.customerType`
          : `modalData.entities.clientMap.${id}.personalInfo.customerType`
      ),
    shallowEqual
  );
  const addrTypeDicts = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.addrTypeDicts,
    shallowEqual
  );
  const customerTypeWithDefault = useGetCustomerType({ customerType });

  return lodash
    .chain(addrTypeDicts)
    .filter(
      (item) =>
        item.customerType === customerTypeWithDefault &&
        lodash.includes(formUtils.queryValue(customerRole), item.customerRole)
    )
    .uniqBy('specifyInfoType')
    .value();
};

const useGetAddrTypeDicts = ({ readOnly, id, config }: any) => {
  const fullDicts =
    config && config['field-props']
      ? getDrowDownList({ config: config['field-props'] })
      : getDrowDownList({ config });
  const addrTypeDicts = useFilterAddrTypeDicts({ readOnly, id, config });
  return lodash.map(addrTypeDicts, (item: any) => ({
    dictCode: item.specifyInfoType,
    dictName:
      lodash.find(fullDicts, { dictCode: item.specifyInfoType })?.dictName || item.specifyInfoType,
  }));
};

const useAllExistCodes = ({ id, readOnly, field }: any) => {
  const addressInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly
          ? `entities.clientMap.${id}.addressInfoList`
          : `modalData.entities.clientMap.${id}.addressInfoList`
      ),
    shallowEqual
  );
  const addressInfoMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly ? `entities.addressInfoMap` : `modalData.entities.addressInfoMap`
      ),
    shallowEqual
  );

  return lodash
    .chain(addressInfoList)
    .map((itemId) => formUtils.queryValue(lodash.get(addressInfoMap, `${itemId}.${field}`)))
    .value();
};

const useGetExistCodes = ({ addressId, id, readOnly, field }: any) => {
  const addressInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly
          ? `entities.clientMap.${id}.addressInfoList`
          : `modalData.entities.clientMap.${id}.addressInfoList`
      ),
    shallowEqual
  );
  const addressInfoMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly ? `entities.addressInfoMap` : `modalData.entities.addressInfoMap`
      ),
    shallowEqual
  );
  return lodash
    .chain(addressInfoList)
    .filter((itemId) => itemId !== addressId)
    .map((itemId) => formUtils.queryValue(lodash.get(addressInfoMap, `${itemId}.${field}`)))
    .value();
};

export { useGetAddrTypeDicts, useGetExistCodes, useFilterAddrTypeDicts, useAllExistCodes };
