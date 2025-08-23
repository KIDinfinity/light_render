import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import moment from 'moment';
import formUtils from '../formUtils';

export const VLD_001084 =
  ({ policyInfo, item }) =>
  (rule: any, value: any, callback: Function) => {
    const { bankCode, bankAccountNo, bankAccountName, currentFrom, currentTo } = item;

    const originClientBankAccountList = lodash
      .chain(policyInfo?.clientBankAccountList)
      ?.filter(
        (item) =>
          !lodash.isEmpty(item.bankAccountNo) &&
          !lodash.isEmpty(item.clientId) &&
          !lodash.isEmpty(policyInfo?.mainOwnerClientId) &&
          item?.clientId === policyInfo?.mainOwnerClientId &&
          item?.bankNewAdd !== 'Y' &&
          item?.typeOfAccount === 'DC'
      )
      .value();

    const duplicate = lodash.some(originClientBankAccountList, (item) => {
      return (
        item?.bankCode === bankCode &&
        Number(item?.bankAccountNo) === Number(bankAccountNo) &&
        item?.bankAccountName === bankAccountName &&
        moment(item?.currentFrom).isSame(currentFrom) &&
        moment(item?.currentTo).isSame(currentTo) &&
        formUtils.queryValue(item?.typeOfAccount) === 'DC'
      );
    });
    if (duplicate) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001205' }));
    }
    callback();
  };
