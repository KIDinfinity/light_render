import React from 'react';
import ConfigurableReadOnlySection from 'basic/components/ConfigurableReadOnlySection';
import useGetTransferPaymentBasicInfo from 'process/NB/ManualUnderwriting/_hooks/useGetTransferPaymentBasicInfo';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { localConfig } from './Section';

const section = 'TransferPayment-Field';

export default () => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  const data = useGetTransferPaymentBasicInfo();

  return (
    <>
      <ConfigurableReadOnlySection data={data} config={config} />
    </>
  );
};
