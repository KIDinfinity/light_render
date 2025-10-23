import React from 'react';
import { Form } from 'antd';
import { FormRegister, ElementConfig, FixedFieldLayout } from 'basic/components/Form';
import Premium, { fieldConfig as premiumConfig } from './Fields/Premium';
import Currency, { fieldConfig as currencyConfig } from './Fields/Currency';

const localSectionConfig = {
  section: 'AdjustPremium',
  'section-props': {
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    visible: 'Y',
    'x-layout': {
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
  configs: [localSectionConfig, premiumConfig, currencyConfig],
  remote: false,
};

const Section = ({ section, form, children }: any) => {
  return (
    <FormRegister form={form}>
      <Form layout="vertical">
        <ElementConfig.Section section={section} config={localConfig}>
          <FixedFieldLayout config={localConfig}>{children}</FixedFieldLayout>
        </ElementConfig.Section>
      </Form>
    </FormRegister>
  );
};

const AdjustPremium = ({ form, editable, children }: any) => (
  <Section section="AdjustPremium" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'AdjustPremium' })
    )}
  </Section>
);
const Fields = {
  Premium,
  Currency,
};

export { Fields, localConfig };
export default AdjustPremium;
