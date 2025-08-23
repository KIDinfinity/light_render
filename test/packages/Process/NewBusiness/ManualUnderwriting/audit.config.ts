import { formatMessageApi } from '@/utils/dictFormatMessage';

// TODO:这里以后需要国际化
export default () => ({
  policyList: {
    title: 'Policy',
    headerTitle: 'Policy',
    policyExclusionList: {
      title: 'Exclusion',
    },
  },
  coverageList: {
    title: 'CoverageInfo',
    headerTitle: 'CoverageInfo',
    coverageFundInfoList: {
      title: 'Fund',
      ownFundInfoList: {
        title: 'Fund-Table',
      },
    },
    coverageInsuredList: {
      title: '',
    },
    coverageExclusionList: {
      title: 'Exclusion',
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
  riskIndicatorConfigList: {
    title: 'Risk Indicator Config',
  },
  agentList: {
    title: 'AgentInfo',
    headerTitle: 'AgentInfo',
  },
  // 这两个好像没有用到
  bankInfoList: {
    title: 'BankInfo',
    headerTitle: 'BankInfo',
  },
  policyAddressList: {
    title: 'Policy Address',
  },

  replacementInfoList: {
    title: 'Replacement Info',
  },
  paymentList: {
    title: 'PaymentInfo',
    headerTitle: 'PaymentInfo',
  },
  chequeInfoList: {
    title: 'PaymentInfo',
    headerTitle: 'PaymentInfo',
  },
  clientInfoList: {
    title: 'CustomerInfo',
    headerTitle: 'CustomerInfo',

    identificationList: {
      title: '',
    },
    crtInfoList: {
      title: '',
    },
    roleList: {
      title: '',
    },
    addressList: {
      title: '',
    },
    riskIndicatorList: {
      title: '',
    },
    consentsList: {
      title: '',
    },
    atermisResult: {
      title: '',
    },
    contactInfoList: {
      title: '',
    },
    contactInfoKH: {
      title: '',
    },
    financialInfo: {
      title: '',
    },
    nationalityInfo: {
      title: '',
    },
    otherInfo: {
      title: '',
    },
    personalInfo: {
      title: '',
    },
    addressInfoList: {
      title: '',
    },
    backgroundInfo: {
      title: '',
    },
  },
  planInfoData: {
    title: 'PlanInfo',
    headerTitle: 'PlanInfo',
  },
  fund: {
    title: 'Fund',
    headerTitle: 'Fund',
  },
  policyReplacement: {
    title: 'ROP',
    headerTitle: 'ROP',
  },
  charityOrganizationList: {
    title: 'Charity',
    headerTitle: 'Charity',
  },
  takeOver: {
    title: 'TakeOver',
    headerTitle: 'TakeOver',
  },
});
