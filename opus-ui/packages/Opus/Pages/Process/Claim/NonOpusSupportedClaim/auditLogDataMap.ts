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
  claimDecision: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.incident',
    }),
  },
  incidentList: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.title.claim-result',
    }),
  },
  followUpInfoList: {
    isNeedIndex: true,
    title: formatMessageApi({
      Label_COM_OPUS: 'followUpTasks',
    }),
  },
});
