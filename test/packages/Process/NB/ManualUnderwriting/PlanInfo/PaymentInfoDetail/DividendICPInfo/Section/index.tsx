import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';

import IcpDividendPayType, {
  fieldConfig as icpDividendPayTypeConfig,
} from './fields/IcpDividendPayType';

import BankAcctName, { fieldConfig as bankAcctNameConfig } from './fields/BankAcctName';

import BankAccountNo, { fieldConfig as bankAccountNoConfig } from './fields/BankAccountNo';

import BankCode, { fieldConfig as bankCodeConfig } from './fields/BankCode';

import BranchName, { fieldConfig as branchNameConfig } from './fields/BranchName';

const localSectionConfig = {
  section: 'DividendandICPInfo-Field',
  'section-props': {
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    visible: 'Y',
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

    icpDividendPayTypeConfig,

    bankAcctNameConfig,

    bankAccountNoConfig,

    bankCodeConfig,

    branchNameConfig,
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

const DividendandICPInfo = ({ form, editable, children }: any) => (
  <Section section="DividendandICPInfo-Field" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'DividendandICPInfo-Field' })
    )}
  </Section>
);
const Fields = {
  IcpDividendPayType,

  BankAcctName,

  BankAccountNo,

  BankCode,

  BranchName,
};

export { Fields, localConfig };
export default DividendandICPInfo;
