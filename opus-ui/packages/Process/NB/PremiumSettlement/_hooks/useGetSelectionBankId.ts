import lodash from 'lodash';
import { useMemo } from 'react';

export default ({ bankList }: any) => {
  return useMemo(() => {
    return lodash
      .chain(bankList)
      .find((bankItem: any) => bankItem.selection === 'Y')
      .get('id')
      .value();
  }, [bankList]);
};
