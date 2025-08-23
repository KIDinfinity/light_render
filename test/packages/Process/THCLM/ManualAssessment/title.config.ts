import { formatMessageApi } from '@/utils/dictFormatMessage';

export default () => ({
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
    title: formatMessageApi({
      Label_BPM_Button: 'app.navigator.task-detail-of-data-capture.button',
    }),
    jpIncident: {
      title: '',
    },
    diagnosisList: {
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.diagnosis',
      }),
    },
    treatmentList: {
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
      }),
      otherProcedureList: {
        title: formatMessageApi({
          Label_BIZ_Claim:
            'app.navigator.task-detail-of-claim-assessment.title.medical-surgical-procedure',
        }),
      },
      jpMedicineTreatmentList: {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.JPCA-of-manual-assessment.label.medicine-treatment',
        }),
        jpTreatmentDateList: {
          title: '',
        },
      },
      procedureList: {
        title: formatMessageApi({
          Label_BPM_Button: 'app.navigator.task-detail-of-data-capture.button.procedure',
        }),
      },
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
  policyBenefitList: {
    title: '',
    beneficiaryList: {
      title: '',
    },
  },
  claimPayableList: {
    title: formatMessageApi({
      Label_BPM_Button: 'app.navigator.task-detail-of-claim-assessment.button.incident-payable',
    }),
    treatmentPayableList: {
      title: formatMessageApi({
        Label_BPM_Button: 'app.navigator.task-detail-of-claim-assessment.button.treatment-payable',
      }),
      invoicePayableList:{
        title: formatMessageApi({
          Label_BPM_Button: 'app.navigator.task-detail-of-claim-assessment.button.invoice-payable',
        }),
        serviceItemPayableList:{
          title: formatMessageApi({
            Label_BPM_Button: 'app.navigator.task-detail-of-claim-assessment.button.service-payable',
          }),
        }
      }
    },
  },
});
