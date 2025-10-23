import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import { formUtils } from 'basic/components/Form';

export default ({ coverageId }: any) => {
  const coverageList = useGetCoverageList();
  return useMemo(() => {
    const productCode = formUtils.queryValue(
      lodash
        .chain(coverageList)
        .find((item) => item.id === coverageId)
        .get('productCode')
        .value()
    );

    const loadingRule = lodash
      .chain(coverageList)
      .find((item) => item?.id === coverageId)
      .get('loadingRule')
      .value();

    return loadingRule?.addLoading === 'N' && loadingRule?.productCode === productCode;
  }, [coverageId, coverageList]);
};
