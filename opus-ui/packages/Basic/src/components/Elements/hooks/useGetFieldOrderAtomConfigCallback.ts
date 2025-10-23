import { useCallback } from 'react';
import lodash from 'lodash';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

export default ({ localConfig, section }: any) => {
  const sectionConfig = useGetSectionAtomConfig({
    localConfig,
    section,
  });
  return useCallback(
    ({ field }) => {
      return lodash
        .chain(sectionConfig)
        .find((fieldConfig: any) => fieldConfig.field === field)
        .get('field-props.x-layout.lg.order')
        .value();
    },
    [sectionConfig]
  );
};
