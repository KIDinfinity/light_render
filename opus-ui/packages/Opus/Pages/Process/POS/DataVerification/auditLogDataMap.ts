import { formatMessageApi } from '@/utils/dictFormatMessage';
export default () => ({
  transactionTypes: {
    title: 'Transaction',
    decision: {
      title: formatMessageApi({
        Label_BIZ_Claim: 'RequestInfo',
      }),
    },
    declineReason: {
      title: formatMessageApi({
        Label_BIZ_Claim: 'RequestInfo',
      }),
    },
    editDeclineReason: {
      title: formatMessageApi({
        Label_BIZ_Claim: 'RequestInfo',
      }),
    },
    partialWithdrawal: {
      title: formatMessageApi({
        Dropdown_SRV_TransactionType: 'SRV006',
      }),
    },
    suitability: {
      title: formatMessageApi({
        Label_BIZ_Claim: 'Suitability',
      }),
    },
    paymentMethodList: {
      title: formatMessageApi({
        Label_BIZ_SRV: 'PaymentMethod',
      }),
      txPmBankList: {
        title: formatMessageApi({
          Label_BIZ_SRV: 'PaymentMethod',
        }),
      },
      txPmPromptPayList: {
        title: formatMessageApi({
          Label_BIZ_SRV: 'PaymentMethod',
        }),
      },
    },
    investmentConsultant: {
      title: formatMessageApi({
        Dropdown_FND_ICRequester: 'Investment Consultant',
      }),
    },
    fundSwitching: {
      title: formatMessageApi({
        Dropdown_SRV_TransactionType: 'SRV003',
      }),
    },
    checkList: {
      title: formatMessageApi({
        Label_BIZ_Policy: 'Checklist',
      }),
    },
    contactInfo: {
      title: formatMessageApi({
        Dropdown_SRV_TransactionType: 'SRV001',
      }),
    },
    policyAddr: {
      title: formatMessageApi({
        Dropdown_SRV_TransactionType: 'SRV001',
      }),
    },
    beneficiaryList: {
      title: formatMessageApi({
        Dropdown_SRV_TransactionType: 'SRV009',
      }),
    },
    clientInfoList: {
      title: formatMessageApi({
        Dropdown_SRV_TransactionType: 'SRV009',
      }),
      addressList: {
        title: formatMessageApi({
          Dropdown_SRV_TransactionType: 'SRV009',
        }),
      },
      contactList: {
        title: formatMessageApi({
          Dropdown_SRV_TransactionType: 'SRV009',
        }),
      },
    },
    paymentMode: {
      title: formatMessageApi({
        Dropdown_SRV_TransactionType: 'SRV002',
      }),
    },
    changeCustomerInfoList: {
      title: formatMessageApi({
        Dropdown_SRV_TransactionType: 'SRV086',
      }),
    },
    freelookCancellation: {
      title: formatMessageApi({
        Dropdown_SRV_TransactionType: 'SRV010',
      }),
    },
    policySurrender: {
      title: formatMessageApi({
        Dropdown_SRV_TransactionType: 'SRV011',
      }),
    },
    policyLoan: {
      title: formatMessageApi({
        Dropdown_SRV_TransactionType: 'SRV018',
      }),
    },
    paymentInMethodList: {
      title: formatMessageApi({
        Dropdown_SRV_TransactionType: 'SRV008',
      }),
      txPmCreditCardList: {
        title: formatMessageApi({
          Dropdown_SRV_TransactionType: 'SRV008',
        }),
      },
    },
    taxConsent: {
      title: formatMessageApi({
        Dropdown_SRV_TransactionType: 'SRV014',
      }),
    },
    taxConsentList: {
      title: formatMessageApi({
        Dropdown_SRV_TransactionType: 'SRV014',
      }),
    },
  },
  processData: {
    title: 'PolicyInfo',
    mainPolicyId: {
      title: 'PolicyInfo',
    },
  },
});
