import React, { useMemo } from 'react';

import ConfigurableReadOnlySection from 'basic/components/ConfigurableReadOnlySection';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { localConfig, FirstPolicyReplacementFields } from '../_config/PolicyReplacementField';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

interface IPolicyReplacementInfoProps {
  part: 'first' | 'last';
  data: any;
}

export default ({ part, data }: IPolicyReplacementInfoProps) => {
  const config = useGetSectionAtomConfig({
    section: 'PolicyReplacement-Field',
    localConfig,
  });
  const partConfig = useMemo(() => {
    if (part === 'first') {
      return config.filter((item) => FirstPolicyReplacementFields.includes(item.field));
    } else {
      return config.filter((item) => !FirstPolicyReplacementFields.includes(item.field));
    }
  }, [config, part]);

  return <ConfigurableReadOnlySection config={partConfig} data={data} NAMESPACE={NAMESPACE} />;
};
