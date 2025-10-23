import React from 'react';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import ConfigurableReadOnlySection from 'basic/components/ConfigurableReadOnlySection';
import useGetCurrentPolicyCheuqeData from 'process/NB/Share/hooks/useGetCurrentPolicyCheuqeData';
import useGetSectionConfigObject from 'process/NB/Share/hooks/useGetFieldSectionConfigObject';

const ChequeField = () => {
  const config = useGetSectionAtomConfig(useGetSectionConfigObject());

  const data = useGetCurrentPolicyCheuqeData();
  return <ConfigurableReadOnlySection config={config} data={data} />;
};

ChequeField.displayName = 'ChequeField';

export default ChequeField;
