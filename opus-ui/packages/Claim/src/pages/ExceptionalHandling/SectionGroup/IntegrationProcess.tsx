import React from 'react';
import FormSection, { FormLayout } from 'basic/components/Form/FormSection';
import { useSelector } from 'dva';
import ProcessCollapse from '../components/ProcessCollapse';

export default function IntegrationProcess({ index }) {
  const integrationProcessInfoList =
    useSelector(
      (state) =>
        state.exceptionalHandlingController?.claimProcessData
          ?.integrationExceptionHandlingDataList?.[index]?.integrationProcessInfoList
    ) || [];
  return (
    <FormSection
      formId="infoInsured"
      title="IntegrationProcess"
      layConf={24}
      isMargin={false}
      formatType="Label_COM_Exception"
    >
      <FormLayout layConf={24}>
        {integrationProcessInfoList?.length > 0 && (
          <ProcessCollapse integrationProcessInfoList={integrationProcessInfoList} />
        )}
      </FormLayout>
    </FormSection>
  );
}
