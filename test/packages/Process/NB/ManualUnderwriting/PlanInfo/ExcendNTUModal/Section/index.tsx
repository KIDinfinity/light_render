import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import Extendtodate, { fieldConfig as extendtoDateConfig } from './Fields/Extendtodate';
import Extendtodays, { fieldConfig as extendtoDaysConfig } from './Fields/Extendtodays';
import Remindertype, { fieldConfig as reminderTypeConfig } from './Fields/Remindertype';

const localSectionConfig = {
  section: 'NTUinfo-Field',
  'section-props': {
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    visible: 'N',
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

const localConfig = {
  configs: [localSectionConfig, extendtoDateConfig, extendtoDaysConfig, reminderTypeConfig],
  remote: false,
};

const Section = ({ section, form, children }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  return (
    <FormRegister form={form}>
      <Form layout="inline">
        <FixedFieldLayout config={config}>{children}</FixedFieldLayout>
      </Form>
    </FormRegister>
  );
};

const Ntuinfofield = ({ form, editable, children }: any) => (
  <Section section="NTUinfo-Field" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'NTUinfo-Field' })
    )}
  </Section>
);
const Fields = {
  Extendtodate,
  Extendtodays,
  Remindertype,
};

export { Fields, localConfig };
export default Ntuinfofield;
