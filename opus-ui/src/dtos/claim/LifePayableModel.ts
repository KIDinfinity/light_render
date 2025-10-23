// 寿险的赔付金 数据模型
export interface ILifePayable {
  amountType: string;
  assessorOverrideAmount: number | null;
  assessorOverridePercentage: number | null;
  benefitItemCode: string;
  benefitTypeCode: string;
  calculationAmount: number | null;
  claimNo: string;
  creator: string;
  deleted: number;
  gmtCreate: Date;
  gmtModified: Date;
  id: string;
  incidentId: string;
  modifier: string;
  payableAmount: number;
  payableId: string;
  policyNo: string;
  productCode: string;
  reimbursementPercentage: number | null;
  remark: string;
  systemCalculationAmount: number | null;
  transId: string;
}
