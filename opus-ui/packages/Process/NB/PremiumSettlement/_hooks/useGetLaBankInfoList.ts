import lodash from 'lodash';
import { useMemo } from 'react';
import BankSource from 'process/NB/Enum/BankSource';

export default ({ bankList }: any) => {
  return useMemo(() => {
    return lodash
      .chain(bankList)
      .filter((bankItem: any) => bankItem.source === BankSource.LA)
      .value();
  }, [bankList]);
};
