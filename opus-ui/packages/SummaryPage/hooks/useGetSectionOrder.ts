import { useMemo } from 'react';
import lodash from 'lodash';
import useGetSummarySectionConfig from 'summary/hooks/useGetSummarySectionConfig';

export default ({ section }) => {
  const summarySectionConfig = useGetSummarySectionConfig();
  return useMemo(() => {
    return lodash
      .chain(summarySectionConfig)
      .find((item: any) => {
        return item.sectionId === section;
      })
      .get('orderNo')
      .value();
  }, [summarySectionConfig, section]);
};
