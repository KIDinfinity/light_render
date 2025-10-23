import React from 'react';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import EditDetail from './EditDetail';
import { localConfig } from 'process/NB/ManualUnderwriting/Fund/Fund-Table/Section/Edit';

export default () => {
  const config = useGetSectionAtomConfig({
    section: 'Fund-Table',
    localConfig,
  });
  return <EditDetail config={config} />;
};
