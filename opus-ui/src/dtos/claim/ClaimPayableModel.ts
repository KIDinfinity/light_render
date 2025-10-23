import type { ITreatmentPayable } from './TreatmentPayableModel';
import type { ILifePayable } from './LifePayableModel';
// 事故层级的赔付金 数据模型
export interface IClaimPayable {
  assessorOverrideAmount: number | null;
  assessorOverridePercentage: number | null;
  benefitCategory: string;
  benefitTypeCode: string;
  causeOfIncident: string;
  claimDecision: string;
  claimNo: string;
  creator: string;
  declineCode: string;
  deleted: number;
  gmtCreate: Date;
  gmtModified: Date;
  id: string;
  incidentDate: Date;
  incidentId: string;
  insuredId: string;
  lifePayable: ILifePayable;
  modifier: string;
  payableAmount: number;
  policyNo: string;
  policyYear: number;
  primaryDiagnosisCode: string;
  productCode: string;
  remark: string;
  systemCalculationAmount: number | null;
  transId: string;
  treatmentPayableList: ITreatmentPayable[];
  paymentAcceptedResult: string;
  assessmentResult: string;
  paymentAssessmentResult: string;
  mainProductCode: string;
}
