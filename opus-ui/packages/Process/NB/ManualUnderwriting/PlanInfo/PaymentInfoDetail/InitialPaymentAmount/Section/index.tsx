import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';

import Transactionno, { fieldConfig as transactionNoConfig } from './fields/Transactionno';

import Paymentdate, { fieldConfig as paymentDateConfig } from './fields/Paymentdate';

import Dateofdeduction, { fieldConfig as dateOfDeductionConfig } from './fields/Dateofdeduction';

import Paytype, { fieldConfig as payTypeConfig } from './fields/Paytype';

import Policyinitialpremium, {
  fieldConfig as policyInitialPremiumConfig,
} from './fields/Policyinitialpremium';

import Reason, { fieldConfig as reasonConfig } from './fields/Reason';

import Deductionstatus, { fieldConfig as deductionStatusConfig } from './fields/Deductionstatus';

import Paidamount, { fieldConfig as paidAmountConfig } from './fields/Paidamount';

import Paymentoption, { fieldConfig as paymentOptionConfig } from './fields/Paymentoption';

import PaymentMethodType, {
  fieldConfig as PaymentMethodTypeConfig,
} from './fields/PaymentMethodType';

import CardIssuerCountry, {
  fieldConfig as CardIssuerCountryConfig,
} from './fields/CardIssuerCountry';

import HaveCreditCard, { fieldConfig as HaveCreditCardConfig } from './fields/HaveCreditCard';

import Premiumshortfall, { fieldConfig as premiumShortfallConfig } from './fields/Premiumshortfall';

import Paymentreferenceno, {
  fieldConfig as paymentReferenceNoConfig,
} from './fields/Paymentreferenceno';
const localSectionConfig = {
  section: 'InitialPaymentInfo-Table',
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

    transactionNoConfig,

    paymentDateConfig,

    dateOfDeductionConfig,

    payTypeConfig,

    policyInitialPremiumConfig,

    reasonConfig,

    deductionStatusConfig,

    paidAmountConfig,

    paymentOptionConfig,

    PaymentMethodTypeConfig,

    CardIssuerCountryConfig,

    HaveCreditCardConfig,

    premiumShortfallConfig,

    paymentReferenceNoConfig,
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

const Initialpaymentinfotable = ({ form, editable, children }: any) => (
  <Section section="InitialPaymentInfo-Table" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'InitialPaymentInfo-Table' })
    )}
  </Section>
);
const Fields = {
  Transactionno,

  Paymentdate,

  Dateofdeduction,

  Paytype,

  Policyinitialpremium,

  Reason,

  Deductionstatus,

  Paidamount,

  Paymentoption,

  PaymentMethodType,

  CardIssuerCountry,

  HaveCreditCard,

  Premiumshortfall,

  Paymentreferenceno,
};

export { Fields, localConfig };
export default Initialpaymentinfotable;
