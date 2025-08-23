import { formatMessageApi } from '@/utils/dictFormatMessage';

export default () => ({
  fecInfo: {
    detailList: {
      title: formatMessageApi({
        Label_BIZ_Claim: 'FECDetail',
      }),
    },
    fecDecision: {
      title: formatMessageApi({
        Label_BIZ_Claim: 'ApprovalDecision',
      }),
    },
    fecRiskInfo: {
      title: formatMessageApi({
        Label_BIZ_Claim: 'OverallRisk',
      }),
    },
  },
});
