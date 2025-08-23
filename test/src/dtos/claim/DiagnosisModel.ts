// 诊断数据模型
export interface IDiagnosis {
  claimNo: string;
  creator: string;
  criticalIllness: number;
  criticalIllnessName: string;
  dateOfOnset: null;
  deleted: number;
  diagnosisCode: string;
  diagnosisDate: null;
  diagnosisName: string;
  diagnosisNo: string;
  diagnosisType: string;
  diagnosticPathology: number;
  gmtCreate: null;
  gmtModified: null;
  id: string;
  incidentId: string;
  modifier: string;
  orderNum: number;
  pathologicalName: string;
  transId: string;
  stdDiagnosisName: string;
}
