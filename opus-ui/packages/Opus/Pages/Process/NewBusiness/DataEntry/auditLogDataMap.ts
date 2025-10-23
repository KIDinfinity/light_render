import { formatMessageApi } from '@/utils/dictFormatMessage';

export default () => ({
  claimant: {
    title: 'Claimant Information',
  },
  insured: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.insured-information',
    }),
  },
  policyAgent: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'ServiceAgentInformation',
    }),
  },
  payee: {
    payeeList: {
      title: formatMessageApi({
        Label_BPM_Button:
          'app.navigator.task-detail-of-claim-assessment.beneficiary.button.add-card',
      }),
    },
  },
  payeeList: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.payee.titel.payee-list',
    }),
  },
  incidentList: {
    isNeedIndex: true,
    headerTitle: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.incident',
    }),
    title: formatMessageApi({
      Label_BPM_Button: 'app.navigator.task-detail-of-data-capture.button',
    }),
    jpIncident: {
      title: '',
    },
    diagnosisList: {
      isNeedIndex: true,
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.diagnosis',
      }),
      headerTitle: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.diagnosis',
      }),
    },
    treatmentList: {
      isNeedIndex: true,
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
      }),
      jpMedicineTreatmentList: {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.JPCA-of-manual-assessment.label.medicine-treatment',
        }),
        jpTreatmentDateList: {
          title: '',
        },
      },
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
    klipCaseInfoList: {
      title: formatMessageApi({
        Label_BIZ_Claim: 'KLIPCaseInfo',
      }),
    },
  },
  claimRelation: {
    claimApplicationDocList: {},
    claimDocRelationList: {},
    requestFormDocRelationList: {},
    requestFormPolicyRelationList: {},
    incidentDocRelationList: {},
    incidentPolicyRelationList: {},
  },
  claimDecision: { title: formatMessageApi({ Label_CLM_Opus: 'BusinessDecision' }) },
  policyBenefitList: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.payee-information',
    }),
    beneficiaryList: {
      title: '',
    },
  },
  claimPayableList: {
    isNeedIndex: true,
    title: formatMessageApi({
      Label_BPM_Button: 'app.navigator.task-detail-of-claim-assessment.button.incident-payable',
    }),
    treatmentPayableList: {
      isNeedIndex: true,
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
      }),
    },
  },
});
