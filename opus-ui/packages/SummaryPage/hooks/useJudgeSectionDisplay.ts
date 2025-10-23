import { useMemo } from 'react';
import lodash from 'lodash';
import useGetSummarySectionConfig from 'summary/hooks/useGetSummarySectionConfig';

export default ({ section }) => {
  const summarySectionConfig = useGetSummarySectionConfig();
  return useMemo(() => {
    return lodash.some(summarySectionConfig, (item) => {
      return item.sectionId === section;
    });
  }, [summarySectionConfig, section]);
};
