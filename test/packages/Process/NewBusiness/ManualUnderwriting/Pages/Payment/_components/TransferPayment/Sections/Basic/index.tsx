import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

import Policyid, { fieldConfig as policyIdConfig } from './Fields/Policyid';

import Transferedamount, { fieldConfig as transferedAmountConfig } from './Fields/Transferedamount';

import Paidamount, { fieldConfig as paidAmountConfig } from './Fields/Paidamount';

import Policypayor, { fieldConfig as policyPayorConfig } from './Fields/Policypayor';

const localSectionConfig = {
  section: 'TransferPayment-Field',
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

    policyIdConfig,

    transferedAmountConfig,

    paidAmountConfig,

    policyPayorConfig,
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

const Transferpaymentfield = ({ form, editable, children }: any) => (
  <Section section="TransferPayment-Field" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'TransferPayment-Field' })
    )}
  </Section>
);
const Fields = {
  Policyid,

  Transferedamount,

  Paidamount,

  Policypayor,
};

export { Fields, localConfig };
export default Transferpaymentfield;
