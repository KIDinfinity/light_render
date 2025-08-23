import { formatMessageApi } from '@/utils/dictFormatMessage';

// TODO:这里以后需要国际化
export default () => ({
  policyList: {
    title: 'Policy',
    policyExclusionList: {
      title: 'Exclusion'
    },
    fundInfo: {
      title: 'Fund',
      totalFundInfoList: {
        title: 'Fund-Table',
      }
    },
    coverageList: {
      title: 'Coverage',
      coverageInsuredList: {
        title: formatMessageApi({
          Label_BIZ_Underwriting: 'PolicyLevelDecision',
        }),
      },
      coverageExclusionList: {
        title: 'Exclusion'
      },
      coverageLoadingList: {
        title: formatMessageApi({
          Label_BIZ_Policy: 'loading',
        }),
      },
      loadingRule: {
        title: 'loadingRule',
      },
    },
    // 这两个好像没有用到
    bankInfoList: {
      title: 'BankInfo',
    },
    policyAddressList: {
      title: 'Policy Address',
    },

    replacementInfoList: {
      title: 'Replacement Info',
    },
    paymentList: {
      title: 'Payment',
    },
    clientInfoList: {
      title: 'Client Info',
      identificationList: {
        title: 'Identification',
      },
      crtInfoList: {
        title: 'Crt Info',
      },
      roleList: {
        title: 'Role',
      },
      addressList: {
        title: 'Address',
      },
      riskIndicatorList: {
        title: 'Risk Indicator',
      },
      consentsList: {
        title: 'Consents',
      },
      atermisResult: {
        title: 'Atermis Result',
      },
      crtInfoList: {
        title: 'Crt Info',
      },
      contactInfoList: {
        title: 'Contact Info',
      },
    },
  },
  riskIndicatorConfigList: {
    title: 'Risk Indicator Config',
  },
  agentList: {
    title: 'agent',
  },
});
