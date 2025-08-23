import React, { useMemo } from 'react';
import lodash from 'lodash';
import useGetCoverageDataSource from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useGetCoverageDataSource';
import useGetCurrentContractTypeProductDicts from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useGetCurrentContractTypeProductDicts.ts';
import CoverageItem from './components/CoverageItem/index';
import useGetWaiveListByCoreCode from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useGetWaiveListByCoreCode';
import useGetRopListByCoreCode from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useGetRopListByCoreCode';

export default () => {
  const coverageDataSoure = useGetCoverageDataSource();
  const dicts = useGetCurrentContractTypeProductDicts();
  const ropListMap = useGetRopListByCoreCode({});

  const coverageList = useMemo(() => {
    return lodash.map(coverageDataSoure, (item: any) => {
      const localProductName = lodash
        .chain(dicts)
        .find((e: any) => e?.productCode === item?.coreCode)
        .get('productName')
        .value();

      const laSharingGroupNumber = item?.uwProposalHealthFamilySharing?.laSharingGroupNumber;

      const waiveProductList = item?.waiveProductList
        ? lodash
            .chain(item.waiveProductList)
            .map((waive: any) => ({
              waiveProduct: waive.waiveProduct,
              productName: lodash
                .chain(dicts)
                .find((e: any) => e?.productCode === waive?.waiveProduct)
                .get('productName')
                .value(),
            }))
            .value()
        : null;
      const returnOfPremium =
        lodash.find(ropListMap?.[item.coreCode], { dictCode: item.returnOfPremium })?.dictName ||
        item.returnOfPremium;
      return {
        ...item,
        productName: localProductName,
        waiveProductList,
        returnOfPremium,
        laSharingGroupNumber,
      };
    });
  }, [coverageDataSoure, dicts]);

  useGetWaiveListByCoreCode();

  return (
    <>
      {lodash.map(coverageList, (item: any) => {
        return <CoverageItem key={item?.id} item={item} />;
      })}
    </>
  );
};
