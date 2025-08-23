import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../activity.config';
import useGetbankInfoIndex from './useGetbankInfoIndex';

export default ({ type }: any) => {
  const bankInfoIndex = useGetbankInfoIndex({ type });
  const { bankInfoList, laCompanyCode, renewalPayType, icpDividendPayType } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => ({
      bankInfoList: modelnamepsace?.businessData?.policyList?.[0]?.bankInfoList,
      laCompanyCode: modelnamepsace?.businessData?.laCompanyCode,
      renewalPayType: modelnamepsace?.businessData?.policyList?.[0]?.renewalPayType,
      icpDividendPayType: modelnamepsace?.businessData?.policyList?.[0]?.icpDividendPayType,
    }),
    shallowEqual
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
      .find(
        (item: any) =>
          item?.bankCode === bankCode &&
          item?.companyCode === laCompanyCode &&
          item?.renewalPayType === renewalPayType
      ) // 避免bankCode相同时存在多个匹配选项的情况
      .get('factoringHouse')
      .value();
    return { bankAcctFactoryHouse, ...bankInfo, icpDividendPayType };
  }, [
    bankInfoList,
    bankInfoIndex,
    factoringHousesList,
    icpDividendPayType,
    laCompanyCode,
    renewalPayType,
  ]);
};
