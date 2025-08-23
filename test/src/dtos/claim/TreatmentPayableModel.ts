import type { IInvoicePayable } from './InvoicePayableModel';

// 治疗层级的赔付金 数据模型
export interface ITreatmentPayable {
  assessorOverrideAmount: number | null;
  assessorOverrideDays: Date;
  assessorOverrideDeductible: number | null;
  assessorOverridePercentage: number | null;
  benefitAmount: number | null;
  benefitItemCode: string;
  benefitTypeCode: string;
  claimNo: string;
  creator: string;
  dateOfAdmission: Date;
  dateOfConsultation: Date;
  dateOfDischarge: Date;
  deductibleAmount: number | null;
  deductibleDays: null;
  deleted: 0;
  expenseAmount: number | null;
  gmtCreate: Date;
  gmtModified: Date;
  id: string;
  incidentId: string;
  invoicePayableList: IInvoicePayable[];
  modifier: string;
  payableAmount: number | null;
  payableDays: Date;
  payableId: string;
  policyNo: string;
  process: Object[];
  productCode: string;
  reimbursementPercentage: number | null;
  remark: string;
  systemCalculationAmount: number | null;
  transId: string;
  treatmentId: string;
  selected?: boolean;
}
