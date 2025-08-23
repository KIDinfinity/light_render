import { useCallback } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';

export default ({ fieldKey }: any) => {
  const coverageList = useGetCoverageList();
  return useCallback(
    (linkProductCode) => {
      const linkProductDefaultValue = lodash
        .chain(coverageList)
        .find((item: any) => formUtils.queryValue(item.coreCode) === linkProductCode)
        .get(fieldKey)
        .value();
      return linkProductDefaultValue;
    },
    [coverageList, fieldKey]
  );
};
