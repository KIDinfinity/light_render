import { fieldConfig as agencyNameConfig } from './Agencyname.config';
import { fieldConfig as agentEmailConfig } from './Agentemail.config';
import { fieldConfig as agentGivenNameConfig } from './Agentgivenname.config';
import { fieldConfig as agentNoConfig } from './Agentno.config';
import { fieldConfig as agentPhoneConfig } from './Agentphone.config';
import { fieldConfig as servicingBranchConfig } from './ServicingBranch.config';
import { fieldConfig as bankStaffNoConfig } from './Bankstaffno.config';
import { fieldConfig as bankCustomerIdConfig } from './Bankcustomerid.config';
import { fieldConfig as secondaryFwpNameConfig } from './Secondaryfwpname.config';
import { fieldConfig as secondaryFwpCodeConfig } from './Secondaryfwpcode.config';
import { fieldConfig as bltsRefNoConfig } from './Bltsrefno.config';
import { fieldConfig as campaignDateConfig } from './Campaigndate.config';
import { fieldConfig as campaignCodeConfig } from './Campaigncode.config';
import { fieldConfig as affiliateCodeConfig } from './Affiliatecode.config';
import { fieldConfig as agentRelatedConfig } from './Agentrelated.config';
import { fieldConfig as insuranceInforceConfig } from './Insuranceinforce.config';
import { fieldConfig as paidByPolicyLoanConfig } from './Paidbypolicyloan.config';
import { fieldConfig as remarkConfig } from './Remark.config';
import { fieldConfig as signDateConfig } from './Signdate.config';
import { fieldConfig as witnessflagConfig } from './Witnessflag.config';
import { fieldConfig as CommissionSplitPercentConfig } from './CommissionSplitPercent.config';
import { fieldConfig as agentRelationshipConfig } from './Agentrelationship.config';
import { fieldConfig as crossSellingConfig } from './Crossselling.config';
import { fieldConfig as BankChannelConfig } from './BankChannel.config';
import { fieldConfig as agentSubChannelCodeConfig } from './Agentsubchannelcode.config';
import { fieldConfig as AgentCertConfig } from './AgentCert.config';
import { fieldConfig as BankStaffPhoneConfig } from './BankStaffPhone.config';
import { fieldConfig as BankStaffRefNameConfig } from './BankStaffRefName.config';
import { fieldConfig as AgentBlacklistConfig } from './AgentBlacklist.config';
import { fieldConfig as CrossSellingFlagConfig } from './CrossSellingFlag.config';
import { fieldConfig as IntermediaryStatusConfig } from './IntermediaryStatus.config';

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
    AgentCertConfig,
    BankStaffPhoneConfig,
    BankStaffRefNameConfig,
    AgentBlacklistConfig,
    CrossSellingFlagConfig,
    IntermediaryStatusConfig,
  ],
  remote: true,
  section: localSectionConfig.section,
};

export { localConfig };
export default localConfig;
