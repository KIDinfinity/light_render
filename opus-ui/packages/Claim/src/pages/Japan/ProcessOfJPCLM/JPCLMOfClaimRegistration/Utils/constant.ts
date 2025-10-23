export const POLICY = {
  basicPlanCode: '',
  beneficiaryName: '',
  benefitTypeArray: [],
  benefitTypeCodeList: [],
  claimNo: '',
  confirmed: 0,
  creator: '',
  deleted: 0,
  external: 0,
  gmtCreate: '',
  gmtModified: '',
  id: '',
  insuredBirthDate: '',
  insuredName: '',
  insuredNameSpelling: '',
  modifier: '',
  policyIssueDate: '',
  policyNo: '',
  policyOwnerName: '',
  policyOwnerNameSpelling: '',
  policyStatus: '',
  remark: '',
  transId: '',
};

export const APPLICATION = {
  applicationNo: '',
  applicationTypeArray: [],
  claimNo: '',
  creator: '',
  deleted: 0,
  documentTypeArray: [],
  gmtCreate: '',
  gmtModified: '',
  id: '',
  modifier: '',
  pendingToRole: '',
  pendingToRoles: [],
  policyNoArray: [],
  recipientAddress: '',
  recipientName: '',
  recipientPostCode: '',
  transId: '',
};

export enum ClaimType {
  'detah' = 'DTH',
}

export enum TreatmentType {
  'IPD' = 'IP',
  IP = 'IP',
  OP = 'OP',
}

export enum DEFAULTTICK {
  '代理店' = 1,
  '営業店',
}
