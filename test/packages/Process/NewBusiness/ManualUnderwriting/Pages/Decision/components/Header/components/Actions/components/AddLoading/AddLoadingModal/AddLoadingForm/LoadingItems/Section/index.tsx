import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';

import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

import Pmloading, { fieldConfig as pmLoadingConfig } from './Fields/Pmloading';

import Pmperiod, { fieldConfig as pmPeriodConfig } from './Fields/Pmperiod';

import Flatmortality, { fieldConfig as flatMortalityConfig } from './Fields/Flatmortality';

import Extramortality, { fieldConfig as extraMortalityConfig } from './Fields/Extramortality';

import Code, { fieldConfig as codeConfig } from './Fields/Code';

import Fmperiod, { fieldConfig as fmPeriodConfig } from './Fields/Fmperiod';

import Emperiod, { fieldConfig as emPeriodConfig } from './Fields/Emperiod';

import ReasonType, { fieldConfig as reasonTypeConfig } from './Fields/ReasonType';

import ReasonTypeDetail, { fieldConfig as reasonTypeDetailConfig } from './Fields/ReasonTypeDetail';

import Remark, { fieldConfig as remarkConfig } from './Fields/Remark';

const localSectionConfig = {
  section: 'Loading-Field',
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

    pmLoadingConfig,

    pmPeriodConfig,

    flatMortalityConfig,

    extraMortalityConfig,

    codeConfig,

    fmPeriodConfig,

    emPeriodConfig,

    reasonTypeConfig,

    reasonTypeDetailConfig,

    remarkConfig,
  ],
  remote: true,
};

const Section = ({ section, form, children, layoutName, formId }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  return (
    <FormRegister form={form} formId={formId}>
      <Form layout="vertical">
        <FixedFieldLayout layoutName={layoutName} config={config}>
          {children}
        </FixedFieldLayout>
      </Form>
    </FormRegister>
  );
};

const Loadingfield = ({
  form,
  editable,
  children,
  layoutName,
  coverageId,
  productId,
  loadingId,
  formId,
}: any) => (
  <Section layoutName={layoutName} section="Loading-Field" form={form} formId={formId}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, {
        form,
        editable,
        coverageId,
        productId,
        section: 'Loading-Field',
        loadingId,
      })
    )}
  </Section>
);
const Fields = {
  Pmloading,

  Pmperiod,

  Flatmortality,

  Extramortality,

  Code,

  Fmperiod,

  Emperiod,

  ReasonType,

  ReasonTypeDetail,

  Remark,
};

export { Fields, localConfig };
export default Loadingfield;
