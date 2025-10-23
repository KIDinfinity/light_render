import { formatMessageApi } from '@/utils/dictFormatMessage';

export default () => ({
  insured: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.insured-information',
    }),
  },
  claimant: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.claimant-information',
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
    diagnosisList: {
      title: formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.diagnosis',
      }),
    },
  },
  payeeList: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.payee-information.upper',
    }),
  },
});
