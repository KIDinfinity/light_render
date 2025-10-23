import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import Bankname, { fieldConfig as bankNameConfig } from './Fields/Bankname';
import BranchCode, { fieldConfig as BranchCodeConfig } from './Fields/BranchCode';
import BranchName, { fieldConfig as BranchNameConfig } from './Fields/BranchName';
import FactoryHouse, { fieldConfig as factoryhouseConfig } from './Fields/FactoryHouse';
import Accountnumber, { fieldConfig as accountNumberConfig } from './Fields/Accountnumber';
import BankAcctName, { fieldConfig as BankAcctNameConfig } from './Fields/BankAcctName';
import ExpiryDate, { fieldConfig as ExpiryDateConfig } from './Fields/ExpiryDate';
import EffectiveDate, { fieldConfig as EffectiveDateConfig } from './Fields/EffectiveDate';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import AccountHolderType, {
  fieldConfig as AccountHolderTypeConfig,
} from './Fields/AccountHolderType';
import RelationshipWithInsured, {
  localFieldConfig as RelationshipWithInsuredConfig,
} from './Fields/RelationshipWithInsured';
import Refundpaytype, { fieldConfig as RefundpaytypeConfig } from './Fields/Refundpaytype';
import Refundremark, { fieldConfig as refundRemarkConfig } from './Fields/Refundremark';

const localSectionConfig = {
  section: 'BankInfo',
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
  configs: [
    localSectionConfig,
    bankNameConfig,
    BranchCodeConfig,
    BranchNameConfig,
    factoryhouseConfig,
    accountNumberConfig,
    BankAcctNameConfig,
    EffectiveDateConfig,
    ExpiryDateConfig,
    AccountHolderTypeConfig,
    RelationshipWithInsuredConfig,
    RefundpaytypeConfig,
    refundRemarkConfig,
  ],
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

const BankInfo = ({ form, editable, children, required, layoutName }: any) => (
  <Section section="BankInfo" form={form} layoutName={layoutName}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, {
        form,
        editable,
        required: Boolean(required),
        section: 'BankInfo',
      })
    )}
  </Section>
);
const Fields = {
  Bankname,
  BranchCode,
  BranchName,
  FactoryHouse,
  Accountnumber,
  BankAcctName,
  ExpiryDate,
  EffectiveDate,
  AccountHolderType,
  RelationshipWithInsured,
  Refundpaytype,
  Refundremark,
};

export { Fields, localConfig };
export default BankInfo;
