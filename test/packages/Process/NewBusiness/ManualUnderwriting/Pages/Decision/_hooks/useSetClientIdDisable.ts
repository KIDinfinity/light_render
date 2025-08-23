import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
export default ({ id }: any) => {
  const coverageList = useGetCoverageList();
  return useMemo(() => {
    const currentCoreCode = formUtils.queryValue(
      lodash
        .chain(coverageList)
        .find((item) => item.id === id)
        .get('coreCode')
        .value()
    );

    return formUtils.queryValue(
      lodash
        .chain(coverageList)
        .find((item) => {
          return item?.productCode === currentCoreCode;
        })
        .get('coverageInsuredList')
        .some((coverageInsuredItem: any) => {
          return lodash.isEmpty(coverageInsuredItem?.clientId);
        })
        .value()
    );
  }, [coverageList, id]);
};
