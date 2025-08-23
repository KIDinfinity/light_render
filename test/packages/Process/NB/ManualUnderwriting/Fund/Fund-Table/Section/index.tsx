import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import Fundallocation, { fieldConfig as fundAllocationConfig } from './Fields/Fundallocation';
import Fundcode, { fieldConfig as fundCodeConfig } from './Fields/Fundcode';
import Fundcurrency, { fieldConfig as fundCurrencyConfig } from './Fields/Fundcurrency';
import Fundname, { fieldConfig as fundNameConfig } from './Fields/Fundname';
import TPARCDAllocation, { fieldConfig as TPARCDAllocationConfig } from './Fields/TPARCDAllocation';
import TPAAllocation, { fieldConfig as TPAAllocationConfig } from './Fields/TPAAllocation';
import EPAAllocation, { fieldConfig as EPAAllocationConfig } from './Fields/EPAAllocation';
import AdhocTopUpAllocation, {
  fieldConfig as AdhocTopUpAllocationConfig,
} from './Fields/AdhocTopUpAllocation';

const localSectionConfig = {
  section: 'Fund-Table',
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
    fundCodeConfig,
    fundNameConfig,
    fundCurrencyConfig,
    fundAllocationConfig,
    TPARCDAllocationConfig,
    TPAAllocationConfig,
    EPAAllocationConfig,
    AdhocTopUpAllocationConfig,
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

const Fundtable = ({ form, editable, children }: any) => (
  <Section section="Fund-Table" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'Fund-Table' })
    )}
  </Section>
);

const Fields = {
  Fundcode,
  Fundname,
  Fundcurrency,
  Fundallocation,
  TPARCDAllocation,
  TPAAllocation,
  EPAAllocation,
  AdhocTopUpAllocation,
};

export { Fields, localConfig };
export default Fundtable;
