import { formatMessageApi } from '@/utils/dictFormatMessage';

export default () => ({
  policyOwnerInformation: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'venus_claim.phowb.dataCapture.label.policyOwnerInformation.title',
    }),
  },
  insuredInformation: {
    title: formatMessageApi({
      Label_BIZ_Claim:
        'venus_claim.phowb.dataCapture.label.policyOwnerInformation.insuredInformation',
    }),
  },
  posRequestInformation: {
    title: formatMessageApi({
      Label_BIZ_Claim: 'venus_claim.phowb.dataCapture.label.requestInformation.title',
    }),
  },
  selectedTransactionTypes: {
    title: formatMessageApi({
      Label_BIZ_POS: 'TransType',
    }),
  },
});
