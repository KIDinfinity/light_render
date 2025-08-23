import { formatMessageApi } from '@/utils/dictFormatMessage';

// TODO
export default () => ({
  insured: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.insured-information',
    }),
  },
  incidentList: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.incident',
    }),
    diagnosisList: {
      ttile: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.diagnosis',
      }),
    },
    treatmentList: {
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
      }),
      mainBenefitList: {
        title: formatMessageApi({
          Label_BIZ_Claim: 'venus-claim-label-mainBenefit',
        }),
      },
      procedureList: {
        surgicalPackage: {
          title: formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.surgical-package',
          }),
        },
      },
    },
  },
  claimDecision: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.title.claim-result',
    }),
  },
  apIncidentDecisionList: {
    title: '',
  },
  followUpInquiryNoClaimList: {
    title: formatMessageApi({ Label_BIZ_Claim: 'venus-claim-label-flowUpClaim' }),
  },
  claimPayableList: {
    title: formatMessageApi({
      Label_BPM_Button: 'app.navigator.task-detail-of-claim-assessment.button.incident-payable',
    }),
  },
});
