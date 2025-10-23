// 费用项层级的赔付金
export interface IServiceItemPayable {
  assessorOverrideAmount: number | null;
  benefitItemCode: string;
  benefitTypeCode: string;
  calculationAmount: number;
  calculationDays: number;
  calculationPerDay: number;
  claimNo: string;
  coInsuranceAmount: number;
  creator: string;
  deductibleAmount: number;
  deleted: number;
  expenseAmount: number;
  gmtCreate: Date;
  gmtModified: Date;
  id: string;
  incidentId: string;
  invoiceId: string;
  invoicePayableId: string;
  modifier: string;
  payableAmount: number;
  payableDays: number;
  payableId: string;
  payablePerDay: number;
  policyNo: string;
  process: Object[];
  productCode: string;
  remark: string;
  serviceItem: string;
  serviceItemId: string;
  systemCalculationAmount: number | null;
  transId: string;
  treatmentId: string;
  treatmentPayableId: string;
}
