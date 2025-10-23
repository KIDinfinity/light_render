import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import Currency, { fieldConfig as currencyConfig } from './Fields/Currency';
import IsNew, { fieldConfig as isNewConfig } from './Fields/IsNew';
import LoanContractNumber, {
  fieldConfig as loanContractNumberConfig,
} from './Fields/LoanContractNumber';
import NewLoanAmount, { fieldConfig as newLoanAmountConfig } from './Fields/NewLoanAmount';
import NumberOfPeriod, { fieldConfig as numberOfPeriodConfig } from './Fields/NumberOfPeriod';
import Period, { fieldConfig as periodConfig } from './Fields/Period';

const localSectionConfig = {
  section: 'Load-Table',
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
    currencyConfig,
    isNewConfig,
    loanContractNumberConfig,
    newLoanAmountConfig,
    numberOfPeriodConfig,
    periodConfig,
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

const Loadtable = ({ form, editable, children }: any) => (
  <Section section="Load-Table" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'Load-Table' })
    )}
  </Section>
);
const Fields = {
  Currency,
  IsNew,
  LoanContractNumber,
  NewLoanAmount,
  NumberOfPeriod,
  Period,
};

export { Fields, localConfig };
export default Loadtable;
