import React from 'react';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import ReadOnlyDetail from './ReadOnlyDetail';
import { localConfig } from './Section';

export default () => {
  const config = useGetSectionAtomConfig({
    section: 'CharityOrganization-Table',
    localConfig,
  });
  return <ReadOnlyDetail config={config} />;
};
