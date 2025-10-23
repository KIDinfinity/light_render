import { useMemo } from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useGetCurrentProductCode from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentProductCode';

export default ({ config }: any) => {
  const fullDicts = getDrowDownList({ config });
  const productCode = useGetCurrentProductCode();

  const hierachyOccupationGroupDicts = getDrowDownList(`hierarchyDicts.productCode.${productCode}`);
  return useMemo(() => {
    if (hierachyOccupationGroupDicts?.length > 0) {
      return hierachyOccupationGroupDicts;
    }
    return fullDicts;
  }, [hierachyOccupationGroupDicts, fullDicts, productCode]);
};
