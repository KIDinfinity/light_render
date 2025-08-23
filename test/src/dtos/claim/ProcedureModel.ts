// 手术 数据模型
export interface IProcedure {
  claimNo: string;
  creator: string;
  deleted: number;
  gmtCreate: Date;
  gmtModified: Date;
  id: string;
  kjCode: string;
  modifier: string;
  operationDate: Date;
  orderNum: number;
  partOfBody: string;
  procedureCode: string;
  procedureName: string;
  reimbursementPercentage: number;
  transId: string;
  treatmentId: string;
  stdPocedureName: string;
}
