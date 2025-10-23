import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

export const VLD_001102 = (policyInfo, changeData) => (
  rule: any,
  value: any,
  callback: Function
) => {
  const originClientContact = lodash.pick(
    policyInfo?.clientContactList?.find(
      (item) => item?.clientId === policyInfo?.mainOwnerClientId
    ) || {},
    ['email', 'phoneNo', 'workNo', 'homeNo']
  );
  const changeClientContact = lodash.pick(changeData.contactInfo || {}, [
    'email',
    'phoneNo',
    'workNo',
    'homeNo',
  ]);
  const policyAddrEmpty = !lodash.some(
    lodash.toPairs(changeData.policyAddr),
    ([key, obj]: any) =>
      [
        'addressLine1',
        'addressLine2',
        'addressLine3',
        'addressLine4',
        'addressLine5',
        'countryCode',
        'zipCode',
        'addressType',
      ].includes(key) && formUtils.queryValue(obj)
  );

  if (lodash.isEqual(originClientContact, changeClientContact) && policyAddrEmpty) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000582' }));
  }
  callback();
};
