import { useCallback } from 'react';
import changeValueByConfig from 'basic/components/Elements/utils/changeValueByConfig';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

export default () => {
  const sectionConfig = useGetSectionAtomConfig({
    localConfig: {},
    section: 'Loading-Field',
  });
  return useCallback(
    ({ reverse, changedFields }) => {
      return changeValueByConfig({
        sectionConfig,
        reverse,
        dataItem: changedFields,
      });
    },
    [sectionConfig]
  );
};
