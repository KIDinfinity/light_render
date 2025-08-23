import React from 'react';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import ConfigurableReadOnlySection from 'basic/components/ConfigurableReadOnlySection';
import useGetCurrentPolicyCheuqeData from 'process/NB/Share/hooks/useGetCurrentPolicyCheuqeData';
import useGetSectionConfigObject from 'process/NB/Share/hooks/useGetFieldSectionConfigObject';
import useAttachWarningIntoFieldsConfig from 'process/NB/Share/hooks/useAttachWarningIntoFieldsConfig';

interface IProps {
  displayWarning: boolean;
}

const ChequeField = ({ displayWarning }: IProps) => {
  const config = useGetSectionAtomConfig(useGetSectionConfigObject());
  const configWithWarning = useAttachWarningIntoFieldsConfig({
    config,
    displayWarning,
  });
  const data = useGetCurrentPolicyCheuqeData();
  return <ConfigurableReadOnlySection config={configWithWarning} data={data} />;
};

ChequeField.displayName = 'ChequeField';

export default ChequeField;
