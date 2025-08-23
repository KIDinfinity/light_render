import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import Reasonflag, { fieldConfig as reasonFlagConfig } from './Fields/Reasonflag';
import Reason, { fieldConfig as reasonConfig } from './Fields/Reason';
import AdditionalReason, { fieldConfig as additionalReasonConfig } from './Fields/AdditionalReason';
import CtfCountryCode, { fieldConfig as ctfCountryCodeConfig } from './Fields/CtfCountryCode';
import CtfId, { fieldConfig as ctfIdConfig } from './Fields/CtfId';
import CountryofTaxResidence, {
  fieldConfig as CountryofTaxResidenceConfig,
} from './Fields/CountryofTaxResidence';

const localSectionConfig = {
  section: 'FinancialInfo-Table',
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
      }, // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 1,
      }, // 1600px
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
    ctfCountryCodeConfig,
    ctfIdConfig,
    reasonFlagConfig,
    reasonConfig,
    additionalReasonConfig,
    CountryofTaxResidenceConfig,
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

const Financialinfotable = ({ form, editable, children }: any) => {
  const config = useGetSectionAtomConfig({
    section: 'FinancialInfo-Table',
    localConfig,
  });
  return (
    <Section section="FinancialInfo-Table" form={form} config={config}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { form, editable, section: 'FinancialInfo-Table' })
      )}
    </Section>
  );
};

const Fields = {
  CtfCountryCode,
  CtfId,
  Reasonflag,
  Reason,
  AdditionalReason,
  CountryofTaxResidence,
};

export { Fields, localConfig };
export default Financialinfotable;
