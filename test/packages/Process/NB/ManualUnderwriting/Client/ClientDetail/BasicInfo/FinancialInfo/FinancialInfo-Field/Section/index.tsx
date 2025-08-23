import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import Annualincome, { fieldConfig as annualIncomeConfig } from './Fields/Annualincome';
import Reasonforpaying, { fieldConfig as reasonForPayingConfig } from './Fields/Reasonforpaying';
import Sourceoffund, { fieldConfig as sourceOfFundConfig } from './Fields/Sourceoffund';
import Annualincomeinlocalcurrency, {
  fieldConfig as AnnualincomeinlocalcurrencyConfig,
} from './Fields/Annualincomeinlocalcurrency';
import Othersource, { fieldConfig as otherSourceConfig } from './Fields/Othersource';
import IndisiaReason, { fieldConfig as IndisiaReasonConfig } from './Fields/IndisiaReason';
import Incomerange, { fieldConfig as incomeRangeConfig } from './Fields/Incomerange';
import usTaxFlag, { fieldConfig as usTaxFlagConfig } from './Fields/usTaxFlag';
import taxDeductionConsent, {
  fieldConfig as taxDeductionConsentConfig,
} from './Fields/taxDeductionConsent';
import MonthlyIncome, { fieldConfig as monthlyIncomeConfig } from './Fields/MonthlyIncome';
import Ctfid, { fieldConfig as ctfidConfig } from './Fields/Ctfid';
import Monthlyincomeinlocalcurrency, {
  fieldConfig as MonthlyincomeinlocalcurrencyConfig,
} from './Fields/MonthlyIncomeinlocalcurrency';
import Annulpremequivalent, {
  fieldConfig as AnnualpremqquivalentConfig,
} from './Fields/Annualpremequivalent';
import MonthlyIncomeRange, {
  fieldConfig as monthlyIncomeRangeConfig,
} from './Fields/MonthlyIncomeRange';

const localSectionConfig = {
  section: 'FinancialInfo-Field',
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
    annualIncomeConfig,
    ctfidConfig,
    sourceOfFundConfig,
    reasonForPayingConfig,
    AnnualincomeinlocalcurrencyConfig,
    otherSourceConfig,
    IndisiaReasonConfig,
    incomeRangeConfig,
    usTaxFlagConfig,
    monthlyIncomeConfig,
    MonthlyincomeinlocalcurrencyConfig,
    AnnualpremqquivalentConfig,
    monthlyIncomeRangeConfig,
    taxDeductionConsentConfig,
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

const Financialinfofield = ({ form, editable, children }: any) => {
  const config = useGetSectionAtomConfig({
    section: 'FinancialInfo-Field',
    localConfig,
  });
  return (
    <Section section="FinancialInfo-Field" form={form} config={config}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { form, editable, section: 'FinancialInfo-Field' })
      )}
    </Section>
  );
};

const Fields = {
  Ctfid,

  Annualincome,

  Sourceoffund,

  Reasonforpaying,

  Annualincomeinlocalcurrency,
  Annulpremequivalent,

  Othersource,

  IndisiaReason,

  Incomerange,
  usTaxFlag,
  MonthlyIncome,
  Monthlyincomeinlocalcurrency,
  MonthlyIncomeRange,
  taxDeductionConsent,
};

export { Fields, localConfig };
export default Financialinfofield;
