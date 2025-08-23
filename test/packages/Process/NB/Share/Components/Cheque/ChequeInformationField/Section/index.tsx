import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useGetSectionConfigObject from 'process/NB/Share/hooks/useGetFieldSectionConfigObject';

import Chequeno, { fieldConfig as chequeNoConfig } from './Fields/Chequeno';

import Chequedate, { fieldConfig as chequeDateConfig } from './Fields/Chequedate';

import Chequeissuebank, { fieldConfig as chequeIssueBankConfig } from './Fields/Chequeissuebank';

import Chequeamount, { fieldConfig as chequeAmountConfig } from './Fields/Chequeamount';

import Chequeformultipleapplication, {
  fieldConfig as chequeForMultipleApplicationConfig,
} from './Fields/Chequeformultipleapplication';

import Chequecurrency, { fieldConfig as chequeCurrencyConfig } from './Fields/Chequecurrency';

const localSectionConfig = {
  section: 'ChequeInformation-Field',
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

    chequeNoConfig,

    chequeDateConfig,

    chequeIssueBankConfig,

    chequeAmountConfig,

    chequeForMultipleApplicationConfig,

    chequeCurrencyConfig,
  ],
  remote: true,
};

const Section = ({ section, form, children }: any) => {
  const config = useGetSectionAtomConfig(useGetSectionConfigObject());

  return (
    <FormRegister form={form}>
      <Form layout="vertical">
        <FixedFieldLayout config={config}>{children}</FixedFieldLayout>
      </Form>
    </FormRegister>
  );
};

const Chequeinformationfield = ({ form, editable, children }: any) => (
  <Section section="ChequeInformation-Field" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'ChequeInformation-Field' })
    )}
  </Section>
);
const Fields = {
  Chequeno,

  Chequedate,

  Chequeissuebank,

  Chequeamount,

  Chequeformultipleapplication,

  Chequecurrency,
};

export { Fields, localConfig };
export default Chequeinformationfield;
