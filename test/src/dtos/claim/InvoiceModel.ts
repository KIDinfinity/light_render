import type { IServiceItem } from './ServiceItemModel';
// 发票数据模型
export interface IInvoice {
  claimNo: string;
  creator: string;
  deleted: number;
  discount: number;
  expense: number;
  gmtCreate: Date;
  gmtModified: Date;
  grossExpense: number;
  id: string;
  invoiceDate: Date;
  invoiceNo: string;
  modifier: string;
  orderNum: number;
  remark: string;
  serviceItemList: IServiceItem[];
  transId: string;
  treatmentId: string;
}
