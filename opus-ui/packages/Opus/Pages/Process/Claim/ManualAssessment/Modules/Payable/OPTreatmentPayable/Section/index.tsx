import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { ElementConfig, FixedFieldLayout, FormRegister } from 'basic/components/Form';
import PayableFields, { localFieldConfigs as PayableFieldConfigs } from './Fields';

const localSectionConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Payable.OPTreatmentPayable',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.title.treatment',
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
  configs: [localSectionConfig, ...PayableFieldConfigs],
  remote: false,
};

const SectionLayout = ({ config, layoutName, form, children }: any) => (
  <FixedFieldLayout config={config} layoutName={layoutName} form={form}>
    {children}
  </FixedFieldLayout>
);

const FormSection = ({ form, section, layoutName, children, register, formId }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });

  return (
    <div>
      <FormRegister form={form} register={register} formId={formId}>
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

const Section = ({ form, editable, children, layoutName, section, register, formId }: any) => (
  <FormSection
    section={section}
    layoutName={layoutName}
    form={form}
    register={register}
    formId={formId}
  >
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section })
    )}
  </FormSection>
);

export { PayableFields, localConfig };

export default Section;
