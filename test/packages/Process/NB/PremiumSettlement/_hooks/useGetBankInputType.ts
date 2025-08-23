import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import BankSource from 'process/NB/Enum/BankSource';
import BankInputType from 'process/NB/PremiumSettlement/Enum/BankInputType';
import { NAMESPACE } from '../activity.config';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  return useMemo(() => {
    const bankInfoList = lodash.get(businessData, 'policyList[0].bankInfoList');
    if (lodash.some(bankInfoList, (bankItem: any) => bankItem.source === BankSource.LA)) {
      return BankInputType.Selector;
    }
    return BankInputType.Input;
  }, [businessData]);
};
