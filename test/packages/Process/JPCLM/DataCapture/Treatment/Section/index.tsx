import React from 'react';
import { Form } from 'antd';
import { FormRegister, ElementConfig, FixedFieldLayout } from 'basic/components/Form';
import BasicFields, { localFieldConfigs as BasicFieldConfigs } from './Fields/Basic';
import ShortFields, { localFieldConfigs as ShortFieldConfigs } from './Fields/Short';
import HeaderFields, { localFieldConfigs as HeaderFieldConfigs } from './Fields/Header';
import AddFields, { localFieldConfigs as AddFieldsConfigs } from './Fields/Add';

import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

const localSectionConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'treatment',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.title.treatment',
    },
    visible: 'Y',
  },
};

const localConfig = {
  configs: [
    localSectionConfig,
    ...BasicFieldConfigs,
    ...ShortFieldConfigs,
    ...HeaderFieldConfigs,
    ...AddFieldsConfigs,
  ],
  remote: false, // 远程配置来源于本地配置，当远程配置同步后，改remote为true
};

const SectionLayout = ({ config, layoutName, children, form }: any) => (
  <FixedFieldLayout config={config} layoutName={layoutName} form={form}>
    {children}
  </FixedFieldLayout>
);

const FormSection = ({ form, section, layoutName, children, register }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  return (
    <FormRegister form={form} register={register}>
      <Form layout="vertical">
        <SectionLayout layoutName={layoutName} form={form} config={config}>
          {children}
        </SectionLayout>
      </Form>
    </FormRegister>
  );
};

const SectionTitle = ({ prefix, suffix }: any) => {
  return (
    <ElementConfig.SectionTitle
      section={localSectionConfig.section}
      config={localConfig}
      prefix={prefix}
      suffix={suffix}
    />
  );
};

const Section = ({ form, editable, children, layoutName, section, register }: any) => (
  <FormSection section={section} layoutName={layoutName} register={register}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section })
    )}
  </FormSection>
);

export { BasicFields, ShortFields, SectionTitle, HeaderFields, AddFields, localConfig };

export default Section;
