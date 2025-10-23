// 供update以及upload使用
export interface DocumentInfoModel {
  batchNo: string;
  classification: number;
  content: string;
  contentType: number;
  creator: string;
  deleted: number;
  docId: string;
  docTypeCode: string;
  formCategory: string;
  gmtCreate: Date;
  gmtModified: Date;
  id: string;
  image: string;
  indexClass: string;
  insuredName: string;
  modifier: string;
  name: string;
  policies: string;
  receivedDate: Date;
  srcDocId: string;
  submissionId: string;
  transId: string;
}
