// 治療履歴JP数据模型
export interface IJPTreatmentDate {
  claimNo: string;
  creator: string;
  deleted: number;
  gmtCreate: string;
  gmtModified: string;
  id: string;
  medicineId: string;
  modifier: string;
  transId: string;
  treatmentDate: Date;
  treatmentId: string;
}
