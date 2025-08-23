import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';

export default ({ bankItem, bankCodeList, factoringHousesList }: any) => {
  const coverageList = useGetCoverageList();

  return useMemo(() => {
    const productCategory = lodash
      .chain(coverageList)
      .find((item: any) => item.isMain === 'Y')
      .get('productCategory')
      .value();

    const bankCode = formUtils.queryValue(lodash.get(bankItem, 'bankCode'));
    const cardType = formUtils.queryValue(lodash.get(bankItem, 'cardType'));

    return {
      ...bankItem,
      bankCode: lodash.chain(bankCodeList).find({ bankCode }).get('bankName').value(),
      bankAcctFactoryHouse: lodash
        .chain(factoringHousesList)
        .find((item: any) => {
          if (lodash.isEmpty(productCategory)) {
            return item?.bankCode === bankCode;
          }
          return item?.bankCode === bankCode && productCategory === item?.productCategory;
        })
        .get('factoringHouse')
        .value(),
      factoringHouse: lodash
        .chain(factoringHousesList)
        .find((item: any) => {
          if (lodash.isEmpty(productCategory)) {
            return item?.bankCode === cardType;
          }
          return item?.bankCode === cardType && productCategory === item?.productCategory;
        })
        .get('factoringHouse')
        .value(),
    };
  }, [bankItem, bankCodeList, factoringHousesList, coverageList]);
};
