import React from 'react';
import lodash from 'lodash';
import ConfigurableReadOnlySection from 'basic/components/ConfigurableReadOnlySection';
import { localConfig } from 'process/NB/ManualUnderwriting/PolicyReplacement/PolicyReplacement-Field/Section';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import policyReplacementFirstField from './policyReplacementFirstField';
import calculateVisibleConditionConfig from 'process/NewBusiness/ManualUnderwriting/_utils/calculateVisibleConditionConfig';

export default ({ data }: any) => {
  const config = useGetSectionAtomConfig({
    section: 'PolicyReplacement-Field',
    localConfig,
  });
  const currentConfig = lodash
    .chain(config)
    .filter((item) => !lodash.includes(policyReplacementFirstField, item.field))
    .value();
  const calculatedConfig = calculateVisibleConditionConfig(currentConfig, data);
  return <ConfigurableReadOnlySection config={calculatedConfig} data={data} />;
};
