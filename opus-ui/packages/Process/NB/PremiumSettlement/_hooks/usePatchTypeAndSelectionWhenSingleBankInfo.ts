import { useMemo } from 'react';
import lodash from 'lodash';
import BankInfoType from 'process/NB/Enum/BankInfoType';
import { produce } from 'immer';
import PremiumType from '../Enum/premiumType';

export default ({ businessData }: any) => {
  return useMemo(() => {
    const bankInfoList = lodash.chain(businessData).get('policyList[0].bankInfoList', []).value();
    const premiumType = lodash.chain(businessData).get('premiumType').value();
    const needToPatch =
      premiumType === PremiumType.PremiumRefund &&
      lodash.every(bankInfoList, (bankItem: any) => {
        return !bankItem.type && !bankItem.selection;
      }) &&
      bankInfoList?.length === 1;
    if (needToPatch) {
      const newBankInfoList = lodash.map(bankInfoList, (bankItem: any) => {
        return {
          ...bankItem,
          type: BankInfoType.Withdrawal,
          selection: 'Y',
          isPatch: true,
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
