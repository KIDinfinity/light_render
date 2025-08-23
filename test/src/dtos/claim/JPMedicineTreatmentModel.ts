import type { IJPTreatmentDate } from './JPTreatmentDateModel';

// 薬剤JP数据模型
export interface IJPMedicineTreatment {
  claimNo: string;
  creator: string;
  deleted: number;
  diagnosisName: string;
  gmtCreate: string;
  gmtModified: string;
  id: string;
  jpTreatmentDateList: IJPTreatmentDate[];
  medicineName: string;
  medicineTreatmentNo: number;
  medicineTreatmentType: string;
  modifier: string;
  publicInsurance: string;
  publicInsuranceNo: string;
  transId: string;
  treatmentId: string;
}
