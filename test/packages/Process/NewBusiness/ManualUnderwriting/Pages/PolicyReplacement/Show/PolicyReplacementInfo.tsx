import React, { useMemo } from 'react';

import ConfigurableReadOnlySection from 'basic/components/ConfigurableReadOnlySection';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { localConfig, FirstPolicyReplacementFields } from '../_config/PolicyReplacementField';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import calculateVisibleConditionConfig from 'process/NewBusiness/ManualUnderwriting/_utils/calculateVisibleConditionConfig';

interface IPolicyReplacementInfoProps {
  part: 'first' | 'last';
  data: any;
}

export default ({ part, data }: IPolicyReplacementInfoProps) => {
  const config = useGetSectionAtomConfig({
    section: 'PolicyReplacement-Field',
    localConfig,
  });
  const calculatedConfig = calculateVisibleConditionConfig(config, data);
  const partConfig = useMemo(() => {
    if (part === 'first') {
      return calculatedConfig.filter((item) => FirstPolicyReplacementFields.includes(item.field));
    } else {
      return calculatedConfig.filter((item) => !FirstPolicyReplacementFields.includes(item.field));
    }
  }, [calculatedConfig, part]);

  return <ConfigurableReadOnlySection config={partConfig} data={data} NAMESPACE={NAMESPACE} />;
};
