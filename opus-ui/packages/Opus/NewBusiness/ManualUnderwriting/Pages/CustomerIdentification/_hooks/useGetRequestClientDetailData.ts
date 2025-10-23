import { useMemo } from 'react';
import lodash from 'lodash';
import moment from 'moment';
import { tenant, Region } from '@/components/Tenant';
import { useGetFullNameByClientInfo } from './';
import CrtInfoType from '../Enum/CrtInfoType';
import AddressType from '../Enum/AddressType';

export default ({ item, flag }: any) => {
  const getCleintName = useGetFullNameByClientInfo();

  return useMemo(() => {
    const extra = {
      age: moment().diff(moment(item?.dateOfBirth), 'years'),
      maritalStatus: item?.customerMrgStatus,
      businessAddress: lodash
        .chain(item)
        .get('addressList', [])
        .find((item: any) => item?.addrType === AddressType.Business)
        .get('fullAddress')
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
      primaryExpiryDate: lodash
        .chain(item)
        .get('crtInfoList')
        .find((crtInfo: any) => crtInfo?.type === CrtInfoType.Primary)
        .get('ctfExpireDate')
        .value(),
      primaryContactNo: lodash
        .chain(item)
        .get('contactInfoList')
        .find((contactInfo: any) => contactInfo?.contactSeqNum === 1)
        .get('contactNo')
        .value(),
      ctfStartDate: lodash
        .chain(item)
        .get('crtInfoList')
        .find((crtInfo: any) => crtInfo?.type === CrtInfoType.Primary)
        .get('ctfStartDate')
        .value(),
      name: getCleintName({ clientInfo: item }),
    };
    if (flag === 'data') {
      return lodash.size(item?.identificationList) && item?.identificationList
        ? [
            { ...item, ...extra, dataFromSmart: true },
            ...lodash
              .chain(item?.identificationList)
              .filter((iden: any) => iden?.type !== 'A')
              .map((iden: any) => {
                return {
                  ...iden,
                  age:
                    lodash.get(iden, 'age') ||
                    moment(item?.effectiveDate || new Date()).diff(
                      moment(iden.dateOfBirth),
                      'years'
                    ),
                  primaryIdentityNo: lodash.get(iden, 'identityNo'),
                  primaryIdentityType: lodash.get(iden, 'identityType'),
                  primaryContactNo: lodash.get(iden, 'contactNo'),
                  fullAddress: lodash.get(iden, 'identificationAddressList[0].fullAddress'),
                  businessAddress: lodash.get(iden, 'identificationAddressList[0].fullAddress'),
                  primaryExpiryDate: null,
                };
              })
              .value(),
          ]
        : [{ ...item, ...extra, dataFromSmart: true }];
    }
    return {
      ...item,
      ...extra,
    };
  }, [item, flag, getCleintName]);
};
