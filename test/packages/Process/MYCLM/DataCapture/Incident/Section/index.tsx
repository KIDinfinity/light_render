import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { ElementConfig, FixedFieldLayout, FormRegister } from 'basic/components/Form';
import BasicFields, { localFieldConfigs as BasiclocalFieldConfigs } from './Fields/Basic';
import HeaderFields, { localFieldConfigs as HeaderlocalFieldConfigs } from './Fields/Header';
import CheckFields, { localFieldConfigs as ChecklocalFieldConfigs } from './Fields/Check';
import AddFields, { localFieldConfigs as AddlocalFieldConfigs } from './Fields/Add';

const localSectionConfig = {
  atomGroupCode: 'BP_PAPER_CTG002.BP_PAPER_ACT001',
  caseCategory: 'BP_PAPER_CTG002',
  activityCode: 'BP_PAPER_ACT001',
  section: 'Incident',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.title.incident',
    },
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

const localConfig = {
  configs: [
    localSectionConfig,
    ...BasiclocalFieldConfigs,
    ...HeaderlocalFieldConfigs,
    ...ChecklocalFieldConfigs,
    ...AddlocalFieldConfigs,
  ],
  remote: true,
};

const SectionLayout = ({ config, layoutName, form, children }: any) => (
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
    <div>
      <FormRegister form={form} register={register}>
        <Form layout="vertical">
          <SectionLayout layoutName={layoutName} form={form} config={config}>
            {children}
          </SectionLayout>
        </Form>
      </FormRegister>
    </div>
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

const Section = ({ form, editable, children, layoutName, section, register, id }: any) => (
  <FormSection section={section} layoutName={layoutName} form={form} register={register}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section, id })
    )}
  </FormSection>
);

export { HeaderFields, CheckFields, BasicFields, AddFields, SectionTitle, localConfig };

export default Section;
