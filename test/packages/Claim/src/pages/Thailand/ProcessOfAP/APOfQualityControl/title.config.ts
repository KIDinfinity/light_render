import { formatMessageApi } from '@/utils/dictFormatMessage';

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
});
