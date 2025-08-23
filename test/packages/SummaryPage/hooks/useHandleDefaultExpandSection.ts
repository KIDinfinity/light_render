import { useEffect } from 'react';
import lodash from 'lodash';
import useHandleDefautlExpandSectionsCallback from 'basic/components/ExpandableContainer/hooks/useHandleDefautlExpandSectionsCallback';
import useGetSummarySectionConfig from 'summary/hooks/useGetSummarySectionConfig';

export default () => {
  const summarySectionConfig = useGetSummarySectionConfig();
  const handleDefaultExpandSection = useHandleDefautlExpandSectionsCallback();
  useEffect(() => {
    const sectionIds = lodash
      .chain(summarySectionConfig)
      .filter((item: any) => item.defaultExpand)
      .map((item: any) => item.sectionId)
      .value();
    handleDefaultExpandSection({ sectionIds });
  }, [summarySectionConfig, useHandleDefautlExpandSectionsCallback]);
};
