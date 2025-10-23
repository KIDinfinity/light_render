import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import ReasonCode, { fieldConfig as ReasonCodeConfig } from './Fields/ReasonCode';
import LongDescription, { fieldConfig as logDescriptionConfig } from './Fields/LongDescription';
import ShortDescription, { fieldConfig as ShortDescriptionConfig } from './Fields/ShortDescription';
import Uwdecisionreason, { fieldConfig as uwDecisionReasonConfig } from './Fields/Uwdecisionreason';

const localSectionConfig = {
  section: 'PostponeDeclineRemark-Field',
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
  configs: [
    localSectionConfig,
    logDescriptionConfig,
    ReasonCodeConfig,
    ShortDescriptionConfig,
    uwDecisionReasonConfig,
  ],
  remote: true,
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

const DPRemarkSection = ({ form, editable, children }: any) => (
  <Section section="PostponeDeclineRemark-Field" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'PostponeDeclineRemark-Field' })
    )}
  </Section>
);
const Fields = {
  ReasonCode,
  ShortDescription,
  LongDescription,
  Uwdecisionreason,
};

export { Fields, localConfig };
export default DPRemarkSection;
