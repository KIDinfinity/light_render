import React from 'react';
import { Form } from 'antd';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import Insurancecompanyname, {
  fieldConfig as insuranceCompanyNameConfig,
} from './Fields/Insurancecompanyname';
import Clientname, { fieldConfig as clientNameConfig } from './Fields/Clientname';
import Otherpolicytype, { fieldConfig as otherPolicyTypeConfig } from './Fields/Otherpolicytype';
import Otherreason, { fieldConfig as otherReasonConfig } from './Fields/Otherreason';
import Policytype, { fieldConfig as policyTypeConfig } from './Fields/Policytype';
import Reasonforpolicyreplacement, {
  fieldConfig as reasonForPolicyReplacementConfig,
} from './Fields/Reasonforpolicyreplacement';
import Sumassured, { fieldConfig as sumAssuredConfig } from './Fields/Sumassured';
import Policyno, { fieldConfig as policyNoConfig } from './Fields/Policyno';
import Insurername, { fieldConfig as insurerNameConfig } from './Fields/Insurername';
import Planname, { fieldConfig as planNameConfig } from './Fields/Planname';

const localSectionConfig = {
  section: 'PolicyReplacement-Table',
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
    clientNameConfig,
    policyTypeConfig,
    otherPolicyTypeConfig,
    sumAssuredConfig,
    insuranceCompanyNameConfig,
    reasonForPolicyReplacementConfig,
    otherReasonConfig,
    policyNoConfig,
    insurerNameConfig,
    planNameConfig,
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

const Policyreplacementtable = ({ form, editable, children }: any) => (
  <Section section="PolicyReplacement-Table" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'PolicyReplacement-Table' })
    )}
  </Section>
);
const Fields = {
  Clientname,
  Policytype,
  Otherpolicytype,
  Sumassured,
  Insurancecompanyname,
  Reasonforpolicyreplacement,
  Otherreason,
  Policyno,
  Insurername,
  Planname,
};

export { Fields, localConfig };
export default Policyreplacementtable;
