import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import RelationshipWithInsured, {
  localFieldConfig as relationshipWithInsuredConfig,
} from './Fields/RelationshipWithInsured';
import Address, { localFieldConfig as addressConfig } from './Fields/Address';
import DateOfBirth, { localFieldConfig as dateOfBirthConfig } from './Fields/DateOfBirth';
import Email, { localFieldConfig as emailConfig } from './Fields/Email';
import FirstName, { localFieldConfig as firstNameConfig } from './Fields/FirstName';
import Gender, { localFieldConfig as genderConfig } from './Fields/Gender';
import PhoneNo, { localFieldConfig as phoneNoConfig } from './Fields/PhoneNo';
import PostCode, { localFieldConfig as postCodeConfig } from './Fields/PostCode';
import Surname, { localFieldConfig as surnameConfig } from './Fields/Surname';
import Age, { localFieldConfig as ageConfig } from './Fields/Age';
import SMS, { localFieldConfig as smsConfig } from './Fields/Smss';
import BizClientId, { localFieldConfig as LifeJClientIdConfig } from './Fields/BizClientId';

import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

const localSectionConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'claimant',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.title.claimant-information',
    },
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

const localConfig = {
  configs: [
    localSectionConfig,
    addressConfig,
    dateOfBirthConfig,
    relationshipWithInsuredConfig,
    emailConfig,
    firstNameConfig,
    genderConfig,
    phoneNoConfig,
    postCodeConfig,
    surnameConfig,
    ageConfig,
    smsConfig,
    LifeJClientIdConfig,
  ],
  remote: false, // 远程配置来源于本地配置，当远程配置同步后，改remote为true
};

const Section = ({ section, form, children }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  return (
    <div>
      <FormRegister form={form}>
        <Form layout="vertical">
          <FixedFieldLayout config={config}>{children}</FixedFieldLayout>
        </Form>
      </FormRegister>
    </div>
  );
};

const Claimant = ({ form, editable, children }: any) => (
  <Section section="claimant" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'claimant' })
    )}
  </Section>
);

const Fields = {
  RelationshipWithInsured,
  Address,
  DateOfBirth,
  Email,
  FirstName,
  Gender,
  PhoneNo,
  PostCode,
  Surname,
  Age,
  SMS,
  BizClientId,
};

export { Fields, localConfig };

export default Claimant;
