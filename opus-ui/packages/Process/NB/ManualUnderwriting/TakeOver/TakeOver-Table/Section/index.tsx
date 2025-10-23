import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

import Policyno, { fieldConfig as policyNoConfig } from './Fields/Policyno';

import Productcode, { fieldConfig as productCodeConfig } from './Fields/Productcode';

import Planname, { fieldConfig as planNameConfig } from './Fields/Planname';

import Takeoverproducttype, {
  fieldConfig as takeoverProductTypeConfig,
} from './Fields/Takeoverproducttype';

const localSectionConfig = {
  section: 'TakeOver-Table',
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
  configs: [
    localSectionConfig,
    policyNoConfig,
    productCodeConfig,
    planNameConfig,
    takeoverProductTypeConfig,
  ],
  remote: true,
};

const Section = ({ section, form, children }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });

  return (
    <FormRegister form={form}>
      <Form layout="vertical">
        <FixedFieldLayout config={config}>{children}</FixedFieldLayout>
      </Form>
    </FormRegister>
  );
};

const Takeovertable = ({ form, editable, children }: any) => (
  <Section section="TakeOver-Table" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'TakeOver-Table' })
    )}
  </Section>
);
const Fields = {
  Policyno,

  Productcode,

  Planname,

  Takeoverproducttype,
};

export { Fields, localConfig };
export default Takeovertable;
