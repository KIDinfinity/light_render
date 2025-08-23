import React from 'react';
import ConfigurableReadOnlySection from 'basic/components/ConfigurableReadOnlySection';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { localConfig } from '../_config/TakeOverField';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

interface ITakeOverProps {
  data: any;
}

export default ({ data }: ITakeOverProps) => {
  const config = useGetSectionAtomConfig({
    section: 'TakeOver-Field',
    localConfig,
  });

  return <ConfigurableReadOnlySection config={config} localConfig={localConfig} data={data} NAMESPACE={NAMESPACE}/>;
};
