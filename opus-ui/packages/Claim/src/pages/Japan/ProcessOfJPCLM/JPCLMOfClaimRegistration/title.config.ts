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
  // agent与claimant用的同一个reducer
  agent: {
    title: formatMessageApi({
      Label_BIZ_Claim:
        'app.navigator.task-detail-of-data-capture.title.agentNotification-information',
    }),
  },
  reporter: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.reporter-information',
    }),
  },
  incidentList: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.incident',
    }),
    diagnosisList: {
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.diagnosis',
      }),
    },
    treatmentList: {
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
      }),
      procedureList: {
        title: formatMessageApi({
          Label_BIZ_Claim:
            'app.navigator.task-detail-of-data-capture.title.medical-surgical-procedure',
        }),
      },
    },
  },
  policyList: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.policy-information',
    }),
  },
  applicationList: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.claim.apcrTitle',
    }),
  },
});
