import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import useGetProductDicts from 'process/NB/ManualUnderwriting/_hooks/useGetProductDicts';

export default ({ id }: any) => {
  const coverageList = useGetCoverageList();
  const dicts = useGetProductDicts({ id });

  return useMemo(() => {
    const currentCoreCode = formUtils.queryValue(
      lodash
        .chain(coverageList)
        .find((item) => item.id === id)
        .get('coreCode')
        .value()
    );
    if (currentCoreCode) {
      return lodash
        .chain(dicts)
        .every((product: any) => {
          return product.productCode !== currentCoreCode;
        })
        .value();
    }
    return false;
  }, [id, coverageList, dicts]);
};
