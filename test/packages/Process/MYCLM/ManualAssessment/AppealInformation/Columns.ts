import { formatMessageApi } from '@/utils/dictFormatMessage';

export default [{
  title: formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.caseNo' }),
  dataIndex: 'caseNo'
}, {
  title: formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.caseCategory' }),
  dataIndex: 'originalCaseCategory',
  render: (text: string) => formatMessageApi({ Label_BPM_CaseCategory: text }),
}, {
  title: formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.claimType' }),
  dataIndex: 'claimType',
  render: (type: string) => formatMessageApi({ Dropdown_COM_ClaimType: type })
}, {
  title: formatMessageApi({ Label_BIZ_Claim: 'ClaimDecision' }),
  dataIndex: 'assessmentDecision',
  render: (decision: string) => formatMessageApi({ Dropdown_CLM_AssessmentDecision: decision })
}, {
  title: formatMessageApi({ Label_BIZ_Claim: 'TotalPayoutAmount' }),
  dataIndex: 'payableAmount',
}, {
  title: formatMessageApi({ Label_RUL_DomainName: 'CaseRelationship' }),
  dataIndex: 'splitRemark',
}]
