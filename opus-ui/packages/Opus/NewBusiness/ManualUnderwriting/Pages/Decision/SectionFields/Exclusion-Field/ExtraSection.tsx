import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import Remark, { fieldConfig as remarkConfig } from './Fields/Remark';

const localSectionConfig = {
  section: 'ExtraExclusion-Field',
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
  configs: [localSectionConfig, remarkConfig],
  remote: true,
};

const Section = ({ section, form, children, layoutName, className }: any) => {
  const config = useGetSectionAtomConfig({
    localConfig,
    section,
  });
  return (
    <FormRegister form={form}>
      <Form layout="vertical">
        <FixedFieldLayout config={config} layoutName={layoutName} className={className}>
          {children}
        </FixedFieldLayout>
      </Form>
    </FormRegister>
  );
};

const UWDecision = ({ section, form, editable, children, layoutName, className }: any) => {
  return (
    <Section section={section} form={form} layoutName={layoutName} className={className}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { form, editable, section })
      )}
    </Section>
  );
};

const Fields = {
  Remark,
};

export { Fields, localConfig };
export default UWDecision;
