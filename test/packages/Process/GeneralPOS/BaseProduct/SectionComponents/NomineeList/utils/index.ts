import { Region, tenant } from '@/components/Tenant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import moment from 'moment';
import { IdentificationClientTagEnum } from 'process/GeneralPOS/common/Enum';
import AddressType from 'process/GeneralPOS/common/Enum/AddressTypeEnum';
import type { IClient } from '../../CustomerIdentification/types';

const getAddressLine = (address: any) => {
  const { countryCode, addressLine1, addressLine2, addressLine3, addressLine4, addressLine5 } =
    address;
  const addressLine = lodash
    .chain([countryCode, addressLine1, addressLine2, addressLine3, addressLine4, addressLine5])
    .map((item) =>
      formatMessageApi({
        Label_BIZ_Individual: item,
      })
    )
    .join(' ')
    .value();

  return addressLine;
};

const convertIdentificationList = (
  identificationList: any[],
  clientInfo: any,
  identificationResult?: string
): IClient[] => {
  if (lodash.isEmpty(clientInfo) && lodash.isEmpty(identificationList)) {
    return [];
  }
  const { clientSeq } = clientInfo;
  const identificationClientInfoList = identificationList
    ? lodash.find(identificationList, { clientSeq })?.clientInfoList
    : [];
  const clientInfoList: any[] =
    identificationResult === IdentificationClientTagEnum.FullyMatch
      ? identificationClientInfoList
      : [clientInfo, ...(identificationClientInfoList || [])];
  return lodash.map(clientInfoList, (clientInfoItem: any) => {
    const {
      id,
      firstName,
      surname,
      middleName,
      nationality,
      identityNo,
      identityType,
      dateOfBirth,
      clientId,
      ccrClientId,
      gender,
      addressList,
    } = formUtils.objectQueryValue(clientInfoItem || {});

    const address = lodash.find(addressList, { addressType: AddressType.Residence });
    const addressLine = address?.residentialAddress;
    const fullName = lodash.join(
      [firstName, surname, middleName].filter((item) => item),
      ' '
    );

    return {
      id,
      name: fullName,
      gender,
      fullName,
      nationality,
      identityNo,
      identityType,
      dateOfBirth: moment(dateOfBirth).format('DD/MM/yyyy'),
      clientId: tenant.region({
        [Region.TH]: clientId,
        [Region.MY]: ccrClientId,
      }),
      residentialAddress: addressLine,
    };
  });
};

export { convertIdentificationList, getAddressLine };
