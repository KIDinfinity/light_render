import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import Address, { localFieldConfig as addressConfig } from './Fields/Address';
import Age, { localFieldConfig as ageConfig } from './Fields/Age';
import DateOfBirth, { localFieldConfig as dateOfBirthConfig } from './Fields/DateOfBirth';
import DateTimeOfDeath, {
  localFieldConfig as dateTimeOfDeathConfig,
} from './Fields/DateTimeOfDeath';
import Email, { localFieldConfig as emailConfig } from './Fields/Email';
import FirstName, { localFieldConfig as firstNameConfig } from './Fields/FirstName';
import Gender, { localFieldConfig as genderConfig } from './Fields/Gender';
import InsuredId, { localFieldConfig as insuredIdConfig } from './Fields/InsuredId';
import Occupation, { localFieldConfig as occupationConfig } from './Fields/Occupation';
import PhoneNo, { localFieldConfig as phoneNoConfig } from './Fields/PhoneNo';
import PolicyId, { localFieldConfig as policyIdConfig } from './Fields/PolicyId';
import PostCode, { localFieldConfig as postCodeConfig } from './Fields/PostCode';
import SurName, { localFieldConfig as surNameConfig } from './Fields/SurName';

import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

const localSectionConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'insured',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.title.insured-information',
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
    addressConfig,
    ageConfig,
    dateOfBirthConfig,
    dateTimeOfDeathConfig,
    emailConfig,
    firstNameConfig,
    genderConfig,
    insuredIdConfig,
    occupationConfig,
    phoneNoConfig,
    policyIdConfig,
    postCodeConfig,
    surNameConfig,
  ],
  remote: false, // 远程配置来源于本地配置，当远程配置同步后，改remote为true
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

const Insured = ({ form, editable, children }: any) => (
  <Section section="insured" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'insured' })
    )}
  </Section>
);

const Fields = {
  Address,
  Age,
  DateOfBirth,
  DateTimeOfDeath,
  Email,
  FirstName,
  Gender,
  InsuredId,
  Occupation,
  PhoneNo,
  PolicyId,
  PostCode,
  SurName,
};

export { Fields, localConfig };

export default Insured;
