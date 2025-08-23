import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';

import Chequeno, { fieldConfig as chequeNoConfig } from './Fields/Chequeno';

import Chequedate, { fieldConfig as chequeDateConfig } from './Fields/Chequedate';

import Chequeissuebank, { fieldConfig as chequeIssueBankConfig } from './Fields/Chequeissuebank';

import Chequeamount, { fieldConfig as chequeAmountConfig } from './Fields/Chequeamount';

import Chequeformultipleapplication, {
  fieldConfig as chequeForMultipleApplicationConfig,
} from './Fields/Chequeformultipleapplication';
import Chequecurrency, { fieldConfig as chequeCurrencyConfig } from './Fields/Chequecurrency';

import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { useGetSectionConfigObject } from 'process/NewBusiness/ManualUnderwriting/Pages/Payment/_hooks';
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

const SectionLayout = ({ form, showOnly, config, layoutName, children }: any) => (
  <FixedFieldLayout form={form} showOnly={showOnly} config={config} layoutName={layoutName}>
    {children}
  </FixedFieldLayout>
);

const FormSection = ({ form, showOnly, layoutName, children, register, formId }: any) => {
  const config = useGetSectionAtomConfig(useGetSectionConfigObject());
  return (
    <div>
      <FormRegister form={form} register={register} formId={formId} showOnly={showOnly}>
        <Form layout="vertical">
          <SectionLayout layoutName={layoutName} form={form} config={config} showOnly={showOnly}>
            {children}
          </SectionLayout>
        </Form>
      </FormRegister>
    </div>
  );
};
const Section = ({
  form,
  showOnly,
  editable,
  children,
  layoutName,
  section,
  register,
  id,
  formId,
}: any) => (
  <FormSection
    section={section}
    showOnly={showOnly}
    layoutName={layoutName}
    form={form}
    register={register}
    formId={formId}
  >
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section, id, showOnly })
    )}
  </FormSection>
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
export default Section;
