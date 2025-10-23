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
    title: 'Coverage',
    headerTitle: 'Coverage',
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
      isNeedIndex: true,
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
    isNeedIndex: true,
    title: 'Distribution Channel',
    headerTitle: 'Distribution Channel',
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
  clientInfoList: {
    title: 'Client Information',
    headerTitle: 'Client Information',

    identificationList: {
      title: '',
    },
    crtInfoList: {
      isNeedCalIndex: true,
      title: 'CRS',
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
      isNeedIndex: true,
      title: 'Contact Info',
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
      title: 'Address Info',
    },
    backgroundInfo: {
      title: '',
    },
  },
  planInfoData: {
    title: 'Plan Information',
    headerTitle: 'Plan Information',
  },
  paymentInfoData: {
    title: 'Payment Information',
    headerTitle: 'Payment Information',
  },
  policyDecision: {
    title: 'UW Decision',
  },
  fund: {
    title: 'Fund',
    headerTitle: 'Fund',
    fundInfoList: {
      isNeedIndex: true,
      title: 'Fund',
      headerTitle: 'Fund',
    },
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
