import React from 'react';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useGetBankInfoConfig from 'process/NB/ManualUnderwriting/_hooks/useGetBankInfoConfig';
import ReadOnlyDetail from './ReadOnlyDetail';
import { localConfig } from './Section';

export default () => {
  const config = useGetSectionAtomConfig({
    section: 'DividendandICPInfo-Field',
    localConfig,
  });
  const bankInfoConfig = useGetBankInfoConfig({
    config,
  });

  return <ReadOnlyDetail bankInfoConfig={bankInfoConfig} />;
};
