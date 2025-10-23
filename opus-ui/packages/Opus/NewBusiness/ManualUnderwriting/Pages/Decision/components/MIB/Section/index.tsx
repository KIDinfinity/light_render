import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

import ClientId, { fieldConfig as ClientIdConfig } from './Fields/ClientId';

import Customerrole, { fieldConfig as customerRoleConfig } from './Fields/Customerrole';

import Decisioncode, { fieldConfig as decisionCodeConfig } from './Fields/Decisioncode';

import ImpairmentCodeList, {
  fieldConfig as impairmentCodeConfig,
} from './Fields/ImpairmentCodeList';

import Remark, { fieldConfig as remarkConfig } from './Fields/Remark';

const localSectionConfig = {
  section: 'MIBInformation-Table',
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

    ClientIdConfig,

    customerRoleConfig,

    decisionCodeConfig,

    impairmentCodeConfig,

    remarkConfig,
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

const Mibinformationtable = ({ form, editable, children }: any) => (
  <Section section="MIBInformation-Table" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'MIBInformation-Table' })
    )}
  </Section>
);
const Fields = {
  ClientId,

  Customerrole,

  Decisioncode,

  ImpairmentCodeList,

  Remark,
};

export { Fields, localConfig };
export default Mibinformationtable;
