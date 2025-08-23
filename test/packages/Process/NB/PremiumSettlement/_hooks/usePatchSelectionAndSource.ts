import { useMemo } from 'react';
import lodash from 'lodash';
import BankInfoType from 'process/NB/Enum/BankInfoType';
import BankSource from 'process/NB/Enum/BankSource';
import { produce }  from 'immer';

export default ({ businessData }: any) => {
  return useMemo(() => {
    const bankInfoList = lodash.chain(businessData).get('policyList[0].bankInfoList', []).value();
    const needToPatch = lodash.every(bankInfoList, (bankItem: any) => {
      return !bankItem.source && !bankItem.selection;
    });
    if (needToPatch) {
      const hasWithdrawType = lodash.some(
        bankInfoList,
        (bankItem: any) => bankItem.type === BankInfoType.Withdrawal
      );
      const newBankInfoList = lodash.map(bankInfoList, (bankItem: any) => {
        const selection = (
          hasWithdrawType ? bankItem.type === BankInfoType.Withdrawal : bankItem.type === null
        )
          ? 'Y'
          : 'N';
        const source = (() => {
          if (bankItem.type === BankInfoType.Withdrawal) {
            return BankSource.SMART;
          }

          if (bankItem.type === BankInfoType.Existing) {
            return BankSource.LA;
          }
          return BankSource.OWB;
        })();
        return {
          ...bankItem,
          selection,
          source,
        };
      });
      const data = produce(businessData, (draft: any) => {
        lodash.set(draft, 'policyList[0].bankInfoList', newBankInfoList);
      });
      return data;
    }
    return businessData;
  }, [businessData]);
};
