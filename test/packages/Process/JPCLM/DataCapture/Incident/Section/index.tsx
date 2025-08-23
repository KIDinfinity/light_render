import React from 'react';
import { Form } from 'antd';
import { FormRegister, ElementConfig, FixedFieldLayout } from 'basic/components/Form';
import BasicFields, { localFieldConfigs as BasicFieldConfigs } from './Fields/Basic';
import ShortFields, { localFieldConfigs as ShortFieldConfigs } from './Fields/Short';
import AddFields, { localFieldConfigs as AddFieldsConfigs } from './Fields/Add';

import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

const localSectionConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'incident',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.title.incident',
    },
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};

const localConfig = {
  configs: [localSectionConfig, ...BasicFieldConfigs, ...ShortFieldConfigs, ...AddFieldsConfigs],
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

const SectionTitle = ({ prefix, suffix, type }: any) => {
  return (
    <ElementConfig.SectionTitle
      section={localSectionConfig.section}
      config={localConfig}
      prefix={prefix}
      suffix={suffix}
      type={type}
    />
  );
};

const Section = ({ form, editable, children, layoutName, section, register }: any) => (
  <FormSection section={section} layoutName={layoutName} form={form} register={register}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section })
    )}
  </FormSection>
);

export { BasicFields, ShortFields, SectionTitle, AddFields, localConfig };

export default Section;
