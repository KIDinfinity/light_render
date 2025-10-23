import { useMemo } from 'react';
import lodash from 'lodash';
import BankInfoType from 'opus/NewBusiness/Enum/BankInfoType';

interface IParams {
  bankInfoList: any[];
}

export default ({ bankInfoList }: IParams) => {
  return useMemo(() => {
    const icpItem = lodash.find(bankInfoList, (item) => {
      return item.type === BankInfoType.IcpPay;
    });

    const dividendItem = lodash.find(bankInfoList, (item) => {
      return item.type === BankInfoType.Dividend;
    });

    const iCPDividend = lodash.find(bankInfoList, (item) => {
      return item.type === BankInfoType.ICPDividend;
    });
    return icpItem || dividendItem || iCPDividend || {};
  }, [bankInfoList]);
};
