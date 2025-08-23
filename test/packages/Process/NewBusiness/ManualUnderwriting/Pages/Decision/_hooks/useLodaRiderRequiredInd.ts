import { useMemo } from 'react';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import { formUtils } from 'basic/components/Form';
export default ({ id }: any) => {
  const coverageList = useGetCoverageList('edit');
  const regionCode = tenant.region();
  return useMemo(() => {
    const currentCoreCode = formUtils.queryValue(
      lodash
        .chain(coverageList)
        .find((item) => item.id === id)
        .get('coreCode')
        .value()
    );
    return lodash
      .chain(coverageList)
      .some((item: any) => {
        return (
          item?.notManualRemove === 'Y' &&
          item?.productCode === currentCoreCode &&
          regionCode === Region.VN
        );
      })
      .value();
  }, [coverageList, id]);
};
