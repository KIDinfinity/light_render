import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import Code, { fieldConfig as codeConfig } from './Fields/Code';
import LongDescription, { fieldConfig as logDescriptionConfig } from './Fields/LongDescription';
import ShortName, { fieldConfig as shortNameConfig } from './Fields/ShortName';
import Reason, { fieldConfig as reasonConfig } from './Fields/Reason';
import ExclusionReason, { fieldConfig as exclusionReasonConfig } from './Fields/ExclusionReason';
import Exclusionuwdecisionreason, {
  fieldConfig as exclusionUwDecisionReasonConfig,
} from './Fields/Exclusionuwdecisionreason';

const localSectionConfig = {
  section: 'Exclusion-Field',
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
    codeConfig,
    shortNameConfig,
    reasonConfig,
    exclusionReasonConfig,
    exclusionUwDecisionReasonConfig,
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

const UWDecision = ({ form, editable, children }: any) => (
  <Section section="Exclusion-Field" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'Exclusion-Field' })
    )}
  </Section>
);
const Fields = {
  Code,
  ShortName,
  LongDescription,
  Reason,
  ExclusionReason,
  Exclusionuwdecisionreason,
};

export { Fields, localConfig };
export default UWDecision;
