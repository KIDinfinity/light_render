import { useMemo } from 'react';
import lodash from 'lodash';

interface IParams {
  bankInfoList: any[];
  bankType: string;
}

export default ({ bankInfoList, bankType }: IParams) => {
  return useMemo(() => {
    const item = lodash.find(bankInfoList, { type: bankType }) || {};
    return item;
  }, [bankInfoList, bankType]);
};
