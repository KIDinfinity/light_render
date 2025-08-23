import { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const searchBankCodeList =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.searchBankCodeList) || [];

  const bankCodeByRptAndCcList =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.bankCodeByRptAndCcList) ||
    [];

  return useMemo(() => {
    const uniqBankCodeList = lodash.uniqBy(searchBankCodeList, 'bankCode');
    if (!lodash.size(bankCodeByRptAndCcList)) return uniqBankCodeList;

    return lodash.reduce(
      uniqBankCodeList,
      (newBankCodeList: any, filterItem: any) => {
        if (lodash.includes(bankCodeByRptAndCcList, filterItem?.bankCode)) {
          return [...newBankCodeList, filterItem];
        }
        return newBankCodeList;
      },
      []
    );
  }, [searchBankCodeList, bankCodeByRptAndCcList]);
};
