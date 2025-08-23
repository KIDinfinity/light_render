import { useMemo } from 'react';
import lodash from 'lodash';
import useGetSectionConfigWithCondition from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetSectionConfigWithCondition';

export default (field: any) => {
  const configs = useGetSectionConfigWithCondition({
    section: 'PlanInfo-Field',
    condition: 'proposal',
  });

  const config =
    lodash
      .chain(configs || [])
      .find({ field })
      .get('field-props')
      .value() || {};

  return useMemo(() => {
    return {
      editable: config.editable !== 'N',
      typeCode: config['x-dict']?.dictTypeCode || '',
    };
  }, [config]);
};
