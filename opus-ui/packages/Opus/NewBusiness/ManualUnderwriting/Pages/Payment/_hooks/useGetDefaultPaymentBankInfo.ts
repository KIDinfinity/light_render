import { useMemo } from 'react';
import lodash from 'lodash';
import BankInfoType from 'opus/NewBusiness/Enum/BankInfoType';

interface IParams {
  bankInfoList: any[];
}

export default ({ bankInfoList }: IParams) => {
  return useMemo(() => {
    const defaultBankInfo = lodash.find(bankInfoList, (item) => {
      return item.type === BankInfoType.Default;
    });
    return defaultBankInfo || {};
  }, [bankInfoList]);
};
