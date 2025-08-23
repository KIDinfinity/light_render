import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';

import BankAcctName, { fieldConfig as bankAcctNameConfig } from './fields/BankAcctName';

import Bankcode, { fieldConfig as bankCodeConfig } from './fields/Bankcode';

import Accountno, { fieldConfig as accountNoConfig } from './fields/Accountno';

import NameOnCard, { fieldConfig as nameOnCardConfig } from './fields/NameOnCard';

import Cardtype, { fieldConfig as cardTypeConfig } from './fields/Cardtype';

import Creditcardno, { fieldConfig as creditCardNoConfig } from './fields/Creditcardno';

import Maskedcreditcardno, {
  fieldConfig as maskedCreditCardNoConfig,
} from './fields/Maskedcreditcardno';

import ExpiryDate, { fieldConfig as expiryDateConfig } from './fields/ExpiryDate';

import Sbcaca, { fieldConfig as SbcacaConfig } from './fields/Sbcaca';

import Bankacctfactoryhouse, {
  fieldConfig as bankAcctFactoryHouseConfig,
} from './fields/Bankacctfactoryhouse';

import Factoringhouse, { fieldConfig as factoringHouseConfig } from './fields/Factoringhouse';

import Businessbankcode, { fieldConfig as businessBankcodeConfig } from './fields/Businessbankcode';

import AccountHolderType, {
  fieldConfig as AccountHolderTypeConfig,
} from './fields/AccountHolderType';

import RelationshipWithInsured, {
  localFieldConfig as RelationshipWithInsuredConfig,
} from './fields/RelationshipWithInsured';

import Bankcity, { fieldConfig as bankCityConfig } from './fields/Bankcity';

const localSectionConfig = {
  section: 'RenewalPaymentInfo-Table',
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

    bankAcctNameConfig,

    bankCodeConfig,

    accountNoConfig,

    nameOnCardConfig,

    cardTypeConfig,

    creditCardNoConfig,

    maskedCreditCardNoConfig,

    SbcacaConfig,

    expiryDateConfig,

    bankAcctFactoryHouseConfig,

    factoringHouseConfig,

    businessBankcodeConfig,

    AccountHolderTypeConfig,

    RelationshipWithInsuredConfig,

    bankCityConfig,
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

const Renewalpaymentinfotable = ({ form, editable, children }: any) => (
  <Section section="RenewalPaymentInfo-Table" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'RenewalPaymentInfo-Table' })
    )}
  </Section>
);
const Fields = {
  BankAcctName,

  Bankcode,

  Accountno,

  NameOnCard,

  Cardtype,

  Creditcardno,

  Maskedcreditcardno,

  Sbcaca,

  ExpiryDate,

  Bankacctfactoryhouse,

  Factoringhouse,

  Businessbankcode,

  AccountHolderType,

  RelationshipWithInsured,

  Bankcity,
};

export { Fields, localConfig };
export default Renewalpaymentinfotable;
