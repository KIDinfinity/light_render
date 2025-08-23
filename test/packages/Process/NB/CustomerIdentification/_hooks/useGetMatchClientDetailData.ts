import { useMemo } from 'react';
import lodash from 'lodash';
import moment from 'moment';
import { tenant, Region } from '@/components/Tenant';
import CrtInfoType from 'process/NB/CustomerIdentification/Enum/CrtInfoType';
import AddressType from 'process/NB/CustomerIdentification/Enum/AddressType';

export default ({ item }: any) => {
  return useMemo(() => {
    const extra = {
      age: moment().diff(moment(item?.dateOfBirth), 'years'),
      maritalStatus: item?.customerMrgStatus,
      fullAddress: tenant.region({
        [Region.ID]: lodash
          .chain(item)
          .get('addressList', [])
          .find((e: any) => e?.addrType === AddressType.Residence)
          .get('fullAddress')
          .value(),
        notMatch: lodash
          .chain(item)
          .get('addressList', [])
          .find((e: any) => e?.addrType === AddressType.Current)
          .get('fullAddress')
          .value(),
      }),
      businessAddress: lodash
        .chain(item)
        .get('addressList', [])
        .find((item: any) => item?.addrType === AddressType.Business)
        .get('fullAddress')
        .value(),
      primaryContactNo: lodash
        .chain(item)
        .get('contactInfoList')
        .find((contactInfo: any) => contactInfo?.contactSeqNum === 1)
        .get('contactNo')
        .value(),
      primaryIdentityType: lodash
        .chain(item)
        .get('crtInfoList')
        .find((crtInfo: any) => crtInfo?.type === CrtInfoType.Primary)
        .get('ctfType')
        .value(),
      primaryIdentityNo: lodash
        .chain(item)
        .get('crtInfoList')
        .find((crtInfo: any) => crtInfo?.type === CrtInfoType.Primary)
        .get('ctfId')
        .value(),
    };
    return [{ ...item, ...extra, dataFromSmart: true }];
  }, [item]);
};
