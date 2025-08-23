import React from 'react';
import { Form } from 'antd';
import useGetDistributionChannelFieldConfigFilter from 'process/NB/ManualUnderwriting/_hooks/useGetDistributionChannelFieldConfigFilter';
import { FormRegister, FixedFieldLayout } from 'basic/components/Form';
import getApplicableByDisableCondidtions from 'process/NB/ManualUnderwriting/utils/getApplicableByDisableCondidtions';
import useGetFieldsFieldsDisableConditionConfig from 'process/NB/ManualUnderwriting/_hooks/useGetFieldsFieldsDisableConditionConfig';

import Agencyname, { fieldConfig as agencyNameConfig } from './Fields/Agencyname';
import Agentemail, { fieldConfig as agentEmailConfig } from './Fields/Agentemail';
import Agentgivenname, { fieldConfig as agentGivenNameConfig } from './Fields/Agentgivenname';
import Agentno, { fieldConfig as agentNoConfig } from './Fields/Agentno';
import Agentphone, { fieldConfig as agentPhoneConfig } from './Fields/Agentphone';
import ServicingBranch, { fieldConfig as servicingBranchConfig } from './Fields/ServicingBranch';
import Bankstaffno, { fieldConfig as bankStaffNoConfig } from './Fields/Bankstaffno';

import Bankcustomerid, { fieldConfig as bankCustomerIdConfig } from './Fields/Bankcustomerid';

import Secondaryfwpname, { fieldConfig as secondaryFwpNameConfig } from './Fields/Secondaryfwpname';

import Secondaryfwpcode, { fieldConfig as secondaryFwpCodeConfig } from './Fields/Secondaryfwpcode';

import Bltsrefno, { fieldConfig as bltsRefNoConfig } from './Fields/Bltsrefno';

import Campaigndate, { fieldConfig as campaignDateConfig } from './Fields/Campaigndate';

import Campaigncode, { fieldConfig as campaignCodeConfig } from './Fields/Campaigncode';

import Affiliatecode, { fieldConfig as affiliateCodeConfig } from './Fields/Affiliatecode';

import Agentrelated, { fieldConfig as agentRelatedConfig } from './Fields/Agentrelated';

import Insuranceinforce, { fieldConfig as insuranceInforceConfig } from './Fields/Insuranceinforce';

import Paidbypolicyloan, { fieldConfig as paidByPolicyLoanConfig } from './Fields/Paidbypolicyloan';

import Remark, { fieldConfig as remarkConfig } from './Fields/Remark';

import Signdate, { fieldConfig as signDateConfig } from './Fields/Signdate';

import Witnessflag, { fieldConfig as witnessflagConfig } from './Fields/Witnessflag';

import CommissionSplitPercent, {
  fieldConfig as CommissionSplitPercentConfig,
} from './Fields/CommissionSplitPercent';

import Agentrelationship, {
  fieldConfig as agentRelationshipConfig,
} from './Fields/Agentrelationship';

import Crossselling, { fieldConfig as crossSellingConfig } from './Fields/Crossselling';

import BankChannel, { fieldConfig as BankChannelConfig } from './Fields/BankChannel';
import Agentsubchannelcode, {
  fieldConfig as agentSubChannelCodeConfig,
} from './Fields/Agentsubchannelcode';
import Agentgroup, { fieldConfig as agentGroupConfig } from './Fields/Agentgroup';

import AgentCert, { fieldConfig as AgentCertConfig } from './Fields/AgentCert';
import BankStaffPhone, { fieldConfig as BankStaffPhoneConfig } from './Fields/BankStaffPhone';
import AgentBlacklist, { fieldConfig as AgentBlacklistConfig } from './Fields/AgentBlacklist';
import CrossSellingFlag, { fieldConfig as CrossSellingFlagConfig } from './Fields/CrossSellingFlag';

import { tenant, Region } from '@/components/Tenant';

const localSectionConfig = {
  section: 'DistributionChannel-Field',
  'section-props': {
    label: {
      dictTypeCode: '',
      dictCode: '',
    },
    visible: 'Y',
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
    servicingBranchConfig,
    agentNoConfig,
    agentGivenNameConfig,
    agentPhoneConfig,
    agentEmailConfig,
    agencyNameConfig,
    bankStaffNoConfig,

    bankCustomerIdConfig,

    secondaryFwpNameConfig,

    secondaryFwpCodeConfig,

    bltsRefNoConfig,

    campaignDateConfig,

    campaignCodeConfig,

    affiliateCodeConfig,

    agentRelatedConfig,

    agentRelationshipConfig,

    insuranceInforceConfig,

    paidByPolicyLoanConfig,

    remarkConfig,

    signDateConfig,

    CommissionSplitPercentConfig,

    crossSellingConfig,

    BankChannelConfig,

    agentSubChannelCodeConfig,

    witnessflagConfig,

    agentGroupConfig,
    AgentCertConfig,
    BankStaffPhoneConfig,
    AgentBlacklistConfig,
    CrossSellingFlagConfig,
  ],
  remote: true,
};

const Section = ({ section, form, children, showQuestionButton }: any) => {
  let config = useGetDistributionChannelFieldConfigFilter({
    section,
    localConfig,
  });
  config = config.filter((item) => {
    if (
      [
        'remark',
        'insuranceInforce',
        'paidByPolicyLoan',
        'signDate',
        'agentRelationship',
        'agentRelated',
      ].includes(item.field) &&
      tenant.region() === Region.PH &&
      showQuestionButton
    ) {
      return false;
    }
    return true;
  });
  const disableFieldsConditions = useGetFieldsFieldsDisableConditionConfig();
  const configByDisableCondition = config.map((item) => {
    const configItem = getApplicableByDisableCondidtions({
      fieldConfig: item,
      disableFieldsConditions,
      condition: 'proposal',
    });
    return configItem;
  });

  return (
    <FormRegister form={form}>
      <Form layout="vertical">
        <FixedFieldLayout config={configByDisableCondition}>{children}</FixedFieldLayout>
      </Form>
    </FormRegister>
  );
};

const Distributionchannelfield = ({ form, editable, children, showQuestionButton }: any) => (
  <Section section="DistributionChannel-Field" form={form} showQuestionButton={showQuestionButton}>
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { form, editable, section: 'DistributionChannel-Field' })
    )}
  </Section>
);

const Fields = {
  ServicingBranch,
  Agentno,
  Agentgivenname,
  Agentphone,
  Agentemail,
  Agencyname,
  Bankstaffno,

  Bankcustomerid,

  Secondaryfwpname,

  Secondaryfwpcode,

  Bltsrefno,

  Campaigndate,

  Campaigncode,

  Affiliatecode,

  Agentrelated,

  Agentrelationship,

  Insuranceinforce,

  Paidbypolicyloan,

  Remark,

  Signdate,

  CommissionSplitPercent,

  Crossselling,

  BankChannel,

  Agentsubchannelcode,

  Witnessflag,

  Agentgroup,
  AgentCert,
  BankStaffPhone,
  AgentBlacklist,
  CrossSellingFlag,
};

export { Fields, localConfig };
export default Distributionchannelfield;
