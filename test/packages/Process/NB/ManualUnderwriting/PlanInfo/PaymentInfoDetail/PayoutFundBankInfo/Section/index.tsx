import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';

import BankAcctName, { fieldConfig as bankAcctNameConfig } from './fields/BankAcctName';

import BankAccountNo, { fieldConfig as bankAccountNoConfig } from './fields/BankAccountNo';

import BankCode, { fieldConfig as bankCodeConfig } from './fields/BankCode';

import BranchName, { fieldConfig as branchNameConfig } from './fields/BranchName';

import BankAcctFactoryHouse, {
  fieldConfig as bankAcctFactoryHouseConfig,
} from './fields/BankAcctFactoryHouse';

const localSectionConfig = {
  section: 'PayoutFundBankInfo-Table',
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

    bankAccountNoConfig,

    bankCodeConfig,

    branchNameConfig,

    bankAcctFactoryHouseConfig,
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

const PayoutFundBankInfotable = ({ form, editable, children }: any) => (
  <Section section="PayoutFundBankInfo-Table" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'PayoutFundBankInfo-Table' })
    )}
  </Section>
);
const Fields = {
  BankAcctName,

  BankAccountNo,

  BankCode,

  BranchName,

  BankAcctFactoryHouse,
};

export { Fields, localConfig };
export default PayoutFundBankInfotable;
