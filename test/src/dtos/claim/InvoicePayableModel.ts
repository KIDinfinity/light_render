import type { IServiceItemPayable } from './ServiceItemPayableModel';
import type { IBenefitItemPayable } from './BenefitItemPayableModel';
// 账单层级的赔付金 数据模型
export interface IInvoicePayable {
  assessorOverrideAmount: number;
  benefitTypeCode: string;
  claimNo: string;
  creator: string;
  deleted: number;
  expenseAmount: number;
  gmtCreate: Date;
  gmtModified: Date;
  id: string;
  incidentId: string;
  invoiceId: string;
  modifier: string;
  payableAmount: number | null;
  uncoverAmount: number;
  payableId: string;
  policyNo: string;
  productCode: string;
  serviceItemPayableList: IServiceItemPayable[];
  systemCalculationAmount: number | null;
  transId: string;
  treatmentId: string;
  treatmentPayableId: string;
  benefitItemPayableList: IBenefitItemPayable[];
  claimAdjustment: number;
  deductPolicy: string;
}
