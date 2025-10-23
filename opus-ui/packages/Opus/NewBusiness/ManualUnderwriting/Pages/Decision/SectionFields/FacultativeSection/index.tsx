import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { fieldConfig as facultativePackageCodeConfig } from '../UWDecision-Table/Fields/FacultativePackageCode';
import { fieldConfig as facultativeReasonCodeConfig } from '../UWDecision-Table/Fields/FacultativeReason';

const localSectionConfig = {
  section: 'UWDecision-Table',
  'section-props': {
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    visible: 'N',
    'x-layout': {
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

const localConfig = {
  configs: [localSectionConfig, facultativePackageCodeConfig, facultativeReasonCodeConfig],
  remote: true,
};

const Section = ({ section, form, children, layoutName }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });

  return (
    <FormRegister form={form}>
      <Form layout="vertical">
        <FixedFieldLayout config={config} layoutName={layoutName}>
          {children}
        </FixedFieldLayout>
      </Form>
    </FormRegister>
  );
};

const FacultativeSection = ({ form, editable, children, layoutName }: any) => (
  <Section section="UWDecision-Table" form={form} layoutName={layoutName}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'UWDecision-Table' })
    )}
  </Section>
);

export { localConfig, Section };
export default FacultativeSection;
