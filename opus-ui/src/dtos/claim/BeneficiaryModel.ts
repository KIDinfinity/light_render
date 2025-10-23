// 受益人 数据模型
export interface IBeneficiary {
  address: string;
  beneficiaryAmount: number;
  beneficiaryPercentage: number;
  claimNo: string;
  creator: string;
  dateOfBirth: Date;
  deleted: number;
  email: string;
  firstName: string;
  gender: string;
  gmtCreate: Date;
  gmtModified: Date;
  id: string;
  identityNo: string;
  identityType: string;
  modifier: string;
  organization: number;
  payee: string;
  payeeId: string;
  phoneNo: string;
  policyBenefitId: string;
  postCode: string;
  relationshipWithInsured: string;
  relationshipWithPayee: string;
  surname: string;
  transId: string;
}
