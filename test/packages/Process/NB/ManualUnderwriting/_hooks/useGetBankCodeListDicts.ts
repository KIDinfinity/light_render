import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';

export default () => {
  const bankCodeList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.bankCodeList,
    shallowEqual
  );

  const bankCodeFilterArray = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.bankCodeFilterArray,
    shallowEqual
  );

  return useMemo(() => {
    if (!lodash.size(bankCodeFilterArray)) return bankCodeList;

    return lodash
      .chain(bankCodeList)
      .reduce((newBankCodeList: any, filterItem: any) => {
        if (lodash.includes(bankCodeFilterArray, filterItem?.bankCode)) {
          return [...newBankCodeList, filterItem];
        }
        return newBankCodeList;
      }, [])
      .unionBy('bankCode')
      .value();
  }, [bankCodeList, bankCodeFilterArray]);
};
