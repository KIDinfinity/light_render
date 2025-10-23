import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import UwDecision, { fieldConfig as uwDecisionConfig } from './Fields/UwDecision';

const localSectionConfig = {
  section: 'BenefitDecision',
  'section-props': {
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    visible: 'N',
    'x-layout': {
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 1600px
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
  configs: [localSectionConfig, uwDecisionConfig],
  remote: false,
};

const Section = ({ section, form, children }: any) => {
  const config = useGetSectionAtomConfig({
    localConfig,
    section,
  });
  return (
    <FormRegister form={form}>
      <Form layout="vertical">
        <FixedFieldLayout config={config}>{children}</FixedFieldLayout>
      </Form>
    </FormRegister>
  );
};

const UWDecisionSection = ({ form, editable, children }: any) => (
  <Section section="BenefitDecision" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'BenefitDecision' })
    )}
  </Section>
);
const Fields = {
  UwDecision,
};

export { Fields, localConfig };
export default UWDecisionSection;
