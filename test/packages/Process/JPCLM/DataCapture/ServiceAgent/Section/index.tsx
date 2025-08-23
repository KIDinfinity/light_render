import React from 'react';
import { Form } from 'antd';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import AgentStatus, { localFieldConfig as AgentStatusConfig } from './Fields/AgentStatus';
import AgencyCode, { localFieldConfig as AgencyCodeConfig } from './Fields/AgencyCode';
import AgencyName, { localFieldConfig as AgencyNameConfig } from './Fields/AgencyName';
import AgencyPhoneNo, { localFieldConfig as AgencyPhoneNoConfig } from './Fields/AgencyPhoneNo';
import AgentName, { localFieldConfig as AgentNameConfig } from './Fields/AgentName';
import AgentNumber, { localFieldConfig as AgentNumberConfig } from './Fields/AgentNumber';
import BranchCode, { localFieldConfig as BranchCodeConfig } from './Fields/BranchCode';
import BranchName, { localFieldConfig as BranchNameConfig } from './Fields/BranchName';
import AgencyAcceptanceDate, {
  localFieldConfig as AgencyAcceptanceDateConfig,
} from './Fields/AgencyAcceptanceDate';
import InformAgency, { fieldConfig as InformAgencyConfig } from './Fields/InformAgency';

import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

const localSectionConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'agent',
  'section-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'ServiceAgentInformation',
    },
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};

const localConfig = {
  configs: [
    localSectionConfig,
    AgentStatusConfig,
    AgencyCodeConfig,
    AgencyNameConfig,
    AgencyPhoneNoConfig,
    AgentNameConfig,
    AgentNumberConfig,
    BranchCodeConfig,
    BranchNameConfig,
    AgencyAcceptanceDateConfig,
    InformAgencyConfig,
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

const Agent = ({ form, editable, children }: any) => (
  <Section section="agent" form={form}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'agent' })
    )}
  </Section>
);

const Fields = {
  AgentStatus,
  AgencyCode,
  AgencyName,
  AgencyPhoneNo,
  AgentName,
  AgentNumber,
  BranchCode,
  BranchName,
  AgencyAcceptanceDate,
  InformAgency,
};

export { Fields, localConfig };

export default Agent;
