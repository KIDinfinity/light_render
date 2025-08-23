export interface IIncidentDecision {
  benefitTypeCode: string;
  claimNo: string;
  creator: string;
  decision: string;
  deleted: number;
  gmtCreate: Date;
  gmtModified: Date;
  id: string;
  incidentId: string;
  modifier: string;
  policyId: string;
  productCode: string;
  remark: string;
  transId: string;
}
