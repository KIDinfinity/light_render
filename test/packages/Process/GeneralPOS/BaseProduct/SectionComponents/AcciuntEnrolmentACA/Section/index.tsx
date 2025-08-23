import { Form } from 'antd';
import useGetSectionAtomConfigByRemote from 'basic/components/Elements/hooks/useGetSectionAtomConfigByRemote';
import { ElementConfig, FixedFieldLayout, FormRegister } from 'basic/components/Form';
import React from 'react';
import Fields, { localFieldConfigs as FieldConfigs } from './Fields';

const localSectionConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'RecurringPaymentMethod',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Policy',
      dictCode: 'PolicyNo',
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
  configs: [localSectionConfig, ...FieldConfigs],
  remote: true, // 远程配置来源于本地配置，当远程配置同步后，改remote为true
};
const FormSectionDefault = ({ form, section, layoutName, children, layout, formId }: any) => {
  const config = useGetSectionAtomConfigByRemote({
    section,
    localConfig,
  });

  return (
    <div>
      <FormRegister formId={formId} form={form}>
        <Form layout={!!layout ? layout : 'vertical'}>
          <FixedFieldLayout config={config} layoutName={layoutName} form={form}>
            {children}
          </FixedFieldLayout>
        </Form>
      </FormRegister>
    </div>
  );
};

const FormSection = ({ form, formId, section, layoutName, children }: any) => {
  const config = useGetSectionAtomConfigByRemote({
    section,
    localConfig,
  });

  return (
    <div>
      <FormRegister formId={formId} form={form}>
        <Form layout="vertical">
          <FixedFieldLayout config={config} layoutName={layoutName} form={form}>
            {children}
          </FixedFieldLayout>
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

const Section = ({ form, editable, children, layoutName, section, formId }: any) => (
  <FormSection section={section} layoutName={layoutName} form={form} formId={formId}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section })
    )}
  </FormSection>
);
const SectionDafault = ({
  form,
  editable,
  children,
  layoutName,
  section,
  tableCollect,
  layout,
  formId,
}: any) => (
  <FormSectionDefault
    section={section}
    layoutName={layoutName}
    form={form}
    layout={layout}
    tableCollect={tableCollect}
    formId={formId}
  >
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section })
    )}
  </FormSectionDefault>
);
export { Fields, localConfig, localSectionConfig, SectionTitle, SectionDafault };

export default Section;
