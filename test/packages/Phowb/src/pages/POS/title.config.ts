import { formatMessageApi } from '@/utils/dictFormatMessage';

export default () => ({
  posDataDetail: {
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
    partialWithdrawal: {
      fundList: {
        title: formatMessageApi({
          Label_BIZ_Claim: 'venus_claim.phowb.dataCapture.label.partialWithdrawal.title',
        }),
      },
      totalWithdrawAmount: {
        title: formatMessageApi({
          Label_BIZ_Claim:
            'venus_claim.phowb.dataCapture.label.partialWithdrawal.totalWithdrawAmount',
        }),
      },
    },
    contractMailingAddress: {
      title: formatMessageApi({
        Label_BIZ_Claim:
          'venus_claim.phowb.dataCapture.label.currentContactAddress.insuredInformation',
      }),
    },
    payOutOption: {
      title: formatMessageApi({
        Label_BIZ_Claim: 'venus_claim.phowb.dataCapture.label.payOutOption.title',
      }),
    },
    usTaxDeclaration: {
      title: formatMessageApi({
        Label_BIZ_Claim: 'venus_claim.phowb.dataCapture.label.uSTaxDeclarations.title',
      }),
    },
    uwInformation: {
      title: formatMessageApi({
        Label_BIZ_POS: 'UW_Info',
      }),
    },
    approvalPosDecision: {
      title: formatMessageApi({
        Label_BIZ_Claim: 'venus_claim.phowb.dataCapture.label.posDecision',
      }),
    },
    inforcePosDecision: {
      title: formatMessageApi({
        Label_BIZ_Claim: 'venus_claim.phowb.dataCapture.label.posDecision',
      }),
    },
    paymentTrack: {
      title: formatMessageApi({
        Label_BIZ_Claim: 'venus_claim.phowb.dataCapture.label.paymentTrack',
      }),
    },
  },
});
