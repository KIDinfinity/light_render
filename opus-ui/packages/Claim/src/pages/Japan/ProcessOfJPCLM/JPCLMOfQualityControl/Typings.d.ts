export interface DocumentProps {
  applicationNo: string;
  assessmentClaimNo: null | string;
  creator: string;
  deleted: number;
  documentId: string;
  documentStatus: string;
  documentTypeCode: string;
  gmtCreate: string;
  gmtModified: string;
  id: string;
  modifier: string;
  parentClaimNo: string;
  pendInfoId: string;
  processInstanceId: string;
  transId: string;
  formType: string;
  bpmDocumentId: string;
  formData: any;
}

export interface DocumentListProps {
  applicationNo: string;
  pendDocumentInfoList: DocumentProps[];
}
