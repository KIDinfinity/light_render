// 先进医疗JP 数据模型
export interface IJPProcedure {
  claimNo: string;
  creator: string;
  deleted: number;
  expense: number;
  fromDate: Date;
  gmtCreate: Date;
  gmtModified: Date;
  id: string;
  modifier: string;
  orderNum: number;
  partOfBody: string;
  procedureCode: string;
  procedureName: string;
  procedureType: string;
  toDate: Date;
  transId: string;
  treatmentId: string;
}
