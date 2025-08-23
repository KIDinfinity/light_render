import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../activity.config';
import useGetbankInfoIndex from './useGetbankInfoIndex';

export default ({ type }: any) => {
  const bankInfoIndex = useGetbankInfoIndex({ type });
  const bankInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.businessData?.policyList?.[0]?.bankInfoList,
    shallowEqual
  );
  const bankCodeList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.bankCodeList
  );
  const factoringHousesList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.factoringHousesList,
    shallowEqual
  );

  return useMemo(() => {
    const bankInfo = lodash.get(bankInfoList, `[${bankInfoIndex}]`);
    const bankCode = formUtils.queryValue(lodash.get(bankInfo, 'bankCode'));
    const bankAcctFactoryHouse = lodash
      .chain(factoringHousesList)
      .find((item: any) => item?.bankCode === bankCode)
      .get('factoringHouse')
      .value();
    const bankName = lodash
      .chain(bankCodeList)
      .find((bank) => bank.bankCode === bankCode)
      .get('bankName')
      .value();
    return { bankAcctFactoryHouse, ...bankInfo, bankCode: bankName || bankCode };
  }, [bankInfoList, bankInfoIndex, factoringHousesList, bankCodeList]);
};
