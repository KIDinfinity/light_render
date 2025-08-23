import { useCallback } from 'react';
import lodash from 'lodash';
import useGetProductionAndRider from 'process/NB/ManualUnderwriting/_hooks/useGetProductionAndRider';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import { formUtils } from 'basic/components/Form';
import useGetBasicProductData from 'process/NB/ManualUnderwriting/_hooks/useGetBasicProductData';
import useGetLinkProductDefaultValue from 'process/NB/ManualUnderwriting/_hooks/useGetLinkProductDefaultValue';

export default ({ fieldKey, ownField }: any) => {
  const dicts = useGetProductionAndRider();
  const coverageList = useGetCoverageList();
  const baseProductInfo = useGetBasicProductData({ fieldKey, ownField });
  const handleGetLinkProductDefaultValue = useGetLinkProductDefaultValue({ fieldKey, ownField });
  return useCallback(
    (coreCode) => {
      const linkProductCode = lodash
        .chain(dicts)
        .find((item: any) => item.productCode === coreCode)
        .get('linkProductCode')
        .value();
      const linkProductDefaultValue = handleGetLinkProductDefaultValue(linkProductCode);
      const baseProductDefaultValue = lodash.get(baseProductInfo, fieldKey);
      return formUtils.queryValue(linkProductDefaultValue || baseProductDefaultValue);
    },
    [coverageList, baseProductInfo, dicts, handleGetLinkProductDefaultValue]
  );
};
