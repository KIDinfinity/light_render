import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import Code, { fieldConfig as codeConfig } from './Fields/Code';
import ShortName, { fieldConfig as shortNameConfig } from './Fields/ShortName';
import LongDescription, { fieldConfig as logDescriptionConfig } from './Fields/LongDescription';
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

const Section = ({ section, form, children, layoutName, formId }: any) => {
  const config = useGetSectionAtomConfig({
    localConfig,
    section,
  });
  return (
    <FormRegister form={form} formId={formId}>
      <Form layout="vertical">
        <FixedFieldLayout config={config} layoutName={layoutName}>
          {children}
        </FixedFieldLayout>
      </Form>
    </FormRegister>
  );
};

const UWDecision = ({ section, form, editable, children, layoutName, formId }: any) => {
  return (
    <Section section={section} form={form} layoutName={layoutName} formId={formId}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { form, editable, section })
      )}
    </Section>
  );
};
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
