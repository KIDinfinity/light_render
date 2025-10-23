import { formatMessageApi } from '@/utils/dictFormatMessage';

export default () => ({
  insured: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.insured-information',
    }),
  },
  claimant: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.title.claimant-information',
    }),
  },
  policyAgent: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'ServiceAgentInformation',
    }),
  },
  incidentList: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.incident',
    }),
    isNeedIndex: true,
    diagnosisList: {
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.diagnosis',
      }),
      isNeedIndex: true,
    },
    treatmentList: {
      isNeedIndex: true,
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
      }),
      headerTitle: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
      }),
      procedureList: {
        isNeedIndex: true,
        isSortByOtherList: ['opTreatmentList'],
        title: formatMessageApi({
          Label_BIZ_Claim: 'Therapies',
        }),
      },
      otherProcedureList: {
        isNeedIndex: true,
        isSortByOtherList: ['opTreatmentList', 'procedureList'],
        title: formatMessageApi({
          Label_BIZ_Claim: 'Therapies',
        }),
      },
      opTreatmentList: {
        isNeedIndex: true,
        isSortByOtherList: ['opTreatmentList'],
        title: formatMessageApi({
          Label_BIZ_Claim: 'Therapies',
        }),
      },
      invoiceList: {
        isNeedIndex: true,
        isSortByOtherList: ['opTreatmentList', 'procedureList', 'otherProcedureList'],
        title: formatMessageApi({
          Label_BIZ_Claim: 'Therapies',
        }),
      },
    },
  },
  payeeList: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.payee-information',
    }),
    payeeContactList: {
      title: 'Contact Info',
    },
    payeeBankAccountList: {
      title: 'Bank Account Info',
    },
  },
});
