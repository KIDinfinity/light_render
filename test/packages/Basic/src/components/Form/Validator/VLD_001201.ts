import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

export const VLD_001201 = (policyInfo, changeData) => (
  rule: any,
  value: any,
  callback: Function
) => {
  const mainPolicyId = policyInfo?.mainPolicyId;

  const mainOwnerClientId = policyInfo?.mainOwnerClientId;

  const clientContact = policyInfo?.policyDespatchAddressList?.find(
    (item) => item?.clientId === mainOwnerClientId && item?.policyId === mainPolicyId
  );

  const addressDetail = {
    addressLine1: clientContact?.dispatchAddress01,
    addressLine2: clientContact?.dispatchAddress02,
    addressLine3: clientContact?.dispatchAddress03,
    addressLine4: clientContact?.dispatchAddress04,
    addressLine5: clientContact?.dispatchAddress05,
    zipCode: clientContact?.dispatchZipCode,
    preferredMailingAddress: clientContact?.preferredMailingAddress,
    email: clientContact?.emailAddress,
    applyTo: [],
  };

  const policyAddr = changeData?.policyAddr;

  const contactDetail = {
    homeNo: clientContact?.residenceTelNo,
    phoneNo: clientContact?.mobilePhoneNo,
    workNo: clientContact?.businessOfficeNo,
    applyTo: [],
  };

  const contactInfo = changeData?.contactInfo;
  const diffContactKey = ['phoneNo', 'homeNo', 'workNo', 'applyTo'];
  const diffAddressKey = [
    'addressLine1',
    'addressLine2',
    'addressLine3',
    'addressLine4',
    'addressLine5',
    'zipCode',
    'countryCode',
    'preferredMailingAddress',
    'email',
    'applyTo',
  ];
  const originContactData = diffContactKey.reduce((r, c) => {
    r[c] = contactDetail?.[c] || '';
    return r;
  }, {});
  const changeContactData = diffContactKey.reduce((r, c) => {
    r[c] = formUtils.queryValue(contactInfo?.[c] || '');
    return r;
  }, {});
  const originAddrssData = diffAddressKey.reduce((r, c) => {
    r[c] = addressDetail?.[c] || '';
    return r;
  }, {});
  const changeAddressData = diffAddressKey.reduce((r, c) => {
    r[c] = formUtils.queryValue(policyAddr?.[c] || '');
    return r;
  }, {});

  if (
    lodash.isEqual(originContactData, changeContactData) &&
    lodash.isEqual(originAddrssData, changeAddressData)
  ) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000582' }));
  }
  callback();
};
