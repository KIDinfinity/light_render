import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
const targetProductType = ['ILP', 'RT', 'AT'];

export default ({ id }: any) => {
  const coverageList = useGetCoverageList();

  return useMemo(() => {
    const currentProductType = formUtils.queryValue(
      lodash
        .chain(coverageList)
        .find((item) => item.id === id)
        .get('productType')
        .value()
    );
    return lodash.includes(targetProductType, currentProductType);
  }, [coverageList, id]);
};
