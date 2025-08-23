// 费用项数据模型
export interface IServiceItem {
  claimNo: string;
  creator: string;
  deleted: number;
  discount: number;
  expense: number;
  expensePerUnit: number;
  fromDate: Date;
  gmtCreate: Date;
  gmtModified: Date;
  grossExpense: number;
  id: string;
  invoiceId: string;
  modifier: string;
  orderNum: number;
  partOfBody: string;
  procedureItem: string;
  procedureType: string;
  serviceItem: string;
  toDate: Date;
  transId: string;
  unit: number;
}
