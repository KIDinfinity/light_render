import { useCallback } from 'react';
import lodash from 'lodash';
import useGetProductionAndRider from 'process/NB/ManualUnderwriting/_hooks/useGetProductionAndRider';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import { formUtils } from 'basic/components/Form';
import useGetBasicProductData from 'process/NB/ManualUnderwriting/_hooks/useGetBasicProductData';
import useGetLinkProductDefaultValue from 'process/NB/ManualUnderwriting/_hooks/useGetLinkProductDefaultValue';

export default ({ fieldKey, id }: any) => {
  const dicts = useGetProductionAndRider();
  const coverageList = useGetCoverageList();
  const basProductInfo = useGetBasicProductData();
  const handleGetLinkProductDefaultValue = useGetLinkProductDefaultValue({ fieldKey });
  return useCallback(
    ({ coreCode, updatedCode }: any) => {
      const linkProductCode = lodash
        .chain(dicts)
        .find((item: any) => item.productCode === coreCode)
        .get('linkProductCode')
        .value();
      const linkProductDefaultValue = lodash
        .chain(coverageList)
        .map((item) => {
          if (item?.id === id) {
            return {
              ...item,
              coreCode: updatedCode,
            };
          }
          return item;
        })
        .find((item: any) => {
          return formUtils.queryValue(item.coreCode) === linkProductCode;
        })
        .get(fieldKey)
        .value();
      const basProductDefaultValue = lodash.get(basProductInfo, fieldKey);
      return formUtils.queryValue(linkProductDefaultValue || basProductDefaultValue);
    },
    [coverageList, basProductInfo, dicts, handleGetLinkProductDefaultValue, id]
  );
};
