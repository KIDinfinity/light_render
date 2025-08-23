import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import AccountHolder, { localFieldConfig as AccountHolderConfig } from './Fields/AccountHolder';
import NewBankAccount, { localFieldConfig as NewBankAccountConfig } from './Fields/NewBankAccount';
import BankDescription, {
  localFieldConfig as BankDescriptionConfig,
} from './Fields/BankDescription';
import AccountType, { localFieldConfig as AccountTypeConfig } from './Fields/AccountType';
import AccountholderKana, {
  localFieldConfig as AccountholderKanaConfig,
} from './Fields/AccountholderKana';
import BankAccountNo, { localFieldConfig as BankAccountNoConfig } from './Fields/BankAccountNo';
import BankCode, { localFieldConfig as BankCodeConfig } from './Fields/BankCode';
import Banktype, { localFieldConfig as BanktypeConfig } from './Fields/Banktype';
import BankName, { localFieldConfig as BankNameConfig } from './Fields/BankName';
import BranchCode, { localFieldConfig as BranchCodeConfig } from './Fields/BranchCode';
import BranchName, { localFieldConfig as BranchNameConfig } from './Fields/BranchName';
import FirstName, { localFieldConfig as FirstNameConfig } from './Fields/FirstName';
import Organization, { localFieldConfig as OrganizationConfig } from './Fields/Organization';
import BizClientId, { localFieldConfig as BizClientIdConfig } from './Fields/BizClientId';
import AccountHolderClientId, {
  localFieldConfig as AccountHolderClientIdConfig,
} from './Fields/AccountHolderClientId';
import PassbookCode, { localFieldConfig as PassbookCodeConfig } from './Fields/PassbookCode';
import PassbookNo, { localFieldConfig as PassbookNoConfig } from './Fields/PassbookNo';
import PayeeType, { localFieldConfig as PayeeTypeConfig } from './Fields/PayeeType';
import PaymentMethod, { localFieldConfig as PaymentMethodConfig } from './Fields/PaymentMethod';
import PaymentType, { localFieldConfig as PaymentTypeConfig } from './Fields/PaymentType';
import Surname, { localFieldConfig as SurnameConfig } from './Fields/Surname';
import TransferAccount, {
  localFieldConfig as TransferAccountConfig,
} from './Fields/TransferAccount';
import Address, { localFieldConfig as addressConfig } from './Fields/Address';
import Email, { localFieldConfig as emailConfig } from './Fields/Email';
import PhoneNo, { localFieldConfig as PhoneNoConfig } from './Fields/PhoneNo';
import PostCode, { localFieldConfig as postCodeConfig } from './Fields/PostCode';
import SMS, { localFieldConfig as smsConfig } from './Fields/Smss';
import Address2, { localFieldConfig as address2Config } from './Fields/Address2';

import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

const localSectionConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'payee',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.title.payee',
    },
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};

const localConfig = {
  configs: [
    localSectionConfig,
    AccountHolderConfig,
    AccountTypeConfig,
    AccountholderKanaConfig,
    BankAccountNoConfig,
    BankCodeConfig,
    BanktypeConfig,
    BankNameConfig,
    BranchCodeConfig,
    BranchNameConfig,
    FirstNameConfig,
    OrganizationConfig,
    BizClientIdConfig,
    PassbookCodeConfig,
    PassbookNoConfig,
    PayeeTypeConfig,
    PaymentMethodConfig,
    PaymentTypeConfig,
    SurnameConfig,
    TransferAccountConfig,
    addressConfig,
    emailConfig,
    PhoneNoConfig,
    postCodeConfig,
    smsConfig,
    address2Config,
    NewBankAccountConfig,
    BankDescriptionConfig,
    AccountHolderClientIdConfig,
  ],
  remote: false, // 远程配置来源于本地配置，当远程配置同步后，改remote为true
};

const Section = ({ section, form, children }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  return (
    <div>
      <FormRegister form={form}>
        <Form layout="vertical">
          <FixedFieldLayout config={config}>{children}</FixedFieldLayout>
        </Form>
      </FormRegister>
    </div>
  );
};

const Payee = ({ form, editable, children }: any) => (
  <Section section="payee" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'payee' })
    )}
  </Section>
);

const Fields = {
  AccountHolder,
  NewBankAccount,
  BankDescription,
  AccountHolderClientId,
  AccountType,
  AccountholderKana,
  Address2,
  BankAccountNo,
  BankCode,
  Banktype,
  BankName,
  BranchCode,
  BranchName,
  FirstName,
  Organization,
  BizClientId,
  PassbookCode,
  PassbookNo,
  PayeeType,
  PaymentMethod,
  PaymentType,
  Surname,
  TransferAccount,
  Address,
  Email,
  PhoneNo,
  PostCode,
  SMS,
};

export { Fields, localConfig };

export default Payee;
