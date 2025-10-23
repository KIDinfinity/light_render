import type { IBeneficiary } from './BeneficiaryModel';

// 保单受益分配 数据模型
export interface IPolicyBenefit {
  beneficiaryList: IBeneficiary[];
  benefitAmount: number;
  claimNo: string;
  creator: string;
  deleted: number;
  gmtCreate: Date;
  gmtModified: Date;
  id: string;
  modifier: string;
  payablesType: string;
  policyHolder: string;
  policyNo: string;
  policyType: string;
  transId: string;
}
