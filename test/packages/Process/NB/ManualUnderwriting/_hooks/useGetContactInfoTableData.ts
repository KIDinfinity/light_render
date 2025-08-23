import { useMemo } from 'react';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import transFieldValue from 'basic/utils/transFieldValue';
import transFieldsConfig from 'basic/utils/transFieldsConfig';

export default ({ id, config }: any) => {
  const clientDetailList = useGetClientDetailList();
  return useMemo(() => {
    const transConfig = transFieldsConfig({
      config,
    });
    const contactInfoList = lodash
      .chain(clientDetailList)
      .find((item: any) => item?.id === id)
      .get('contactInfoList', [])
      .map((item: any) => {
        return {
          ...item,
          ...tenant.region({
            [Region.ID]: {
              contactNo:
                (item?.countryCode ?? '') +
                (item?.areaCode && item.contactType !== 'Mobile' ? item?.areaCode : '') +
                (item?.contactNo ?? ''),
              countryCode: item?.countryName ?? '',
            },
            [Region.VN]: {
              contactNo: item?.contactNo ?? '',
            },
            notMatch: { contactNo: (item?.countryCode ?? '') + (item?.contactNo ?? '') },
          }),
        };
      })
      .sortBy('contactSeqNum')
      .map((item: any) => {
        const dataMap = new Map();
        for (const [key, value] of Object.entries(item)) {
          const configItem = lodash.find(
            transConfig,
            (fieldItem: any) => lodash.get(fieldItem, 'field') === key
          );
          dataMap.set(
            key,
            transFieldValue({
              value,
              configItem,
            })
          );
        }
        return Object.fromEntries(dataMap);
      })
      .value();
    return contactInfoList;
  }, [clientDetailList, config, id]);
};
