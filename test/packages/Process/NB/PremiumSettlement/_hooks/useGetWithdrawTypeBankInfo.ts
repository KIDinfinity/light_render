import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import BankInfoType from 'process/NB/Enum/BankInfoType';
import { NAMESPACE } from '../activity.config';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  const bankInfoList = lodash.get(businessData, 'policyList[0].bankInfoList');
  return useMemo(() => {
    const WBankInfo = lodash.find(bankInfoList, (item) => item.type === BankInfoType.Withdrawal);
    const nullBankInfo = lodash.find(bankInfoList, (item) => lodash.isEmpty(item.type));
    const WENullBankInfo = lodash.find(
      bankInfoList,
      (item) =>
        item.type === BankInfoType.Withdrawal ||
        item.type === null ||
        item.type === BankInfoType.Existing
    );
    if (lodash.isEmpty(WENullBankInfo)) {
      return lodash.get(bankInfoList, '[0]');
    } else if (!lodash.isEmpty(WBankInfo)) {
      return WBankInfo;
    } else if (!lodash.isEmpty(nullBankInfo)) {
      return nullBankInfo;
    } else {
      return {};
    }
  }, [bankInfoList]);
};
