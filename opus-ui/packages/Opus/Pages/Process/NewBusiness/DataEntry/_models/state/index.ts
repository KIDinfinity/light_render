export const fileInit = {
  fileId: 'fileId',
  fileName: '',
  mimeType: '',
  filePath: '',
  fileBinary: null,
};

export const documentInfoInit = {
  appNo: '',
  batchNo: '',
  businessNo: '',
  caseCategory: '',
  caseNo: '',
  classification: 1,
  content: '',
  contentType: 0,
  creationDate: null,
  creator: '',
  deleted: 0,
  docId: '',
  docTypeCode: '',
  formCategory: '',
  formerDocId: '',
  gmtCreate: null,
  gmtModified: null,
  id: '',
  docDataId: '',
  fileObject: {},
  indexClass: '',
  insuredName: '',
  modifier: '',
  name: '',
  parentBusinessNo: '',
  policies: '',
  receivedDate: null,
  replaceDocId: '',
  srcDocId: '',
  submissionId: '',
  transId: '',
  type: 1,
  voidFlag: 0,
};

const defaultState = {
  processData: {
    policyNoInfo: {},
    agentInfo: {},
    beneficiaries: [],
    deliveryMethod: {},
    dividendIcp: {},
    insuredBizAddr: {},
    insuredCrs: {
      nonThCrsList: [],
    },
    insuredContact: {},
    insuredCurrentAddr: {},
    insuredDispatchAddr: {},
    insuredFatca: {},
    insuredHomeAddr: {},
    insuredInfo: {},
    insuredOccupation: {},
    insuredPdpa: {},
    memoChecklist: {},
    payorBizAddr: {},
    payorCrs: {
      nonThCrsList: [],
    },
    payorContact: {},
    payorCurrentAddr: {},
    payorDispatchAddr: {},
    payorFatca: {},
    payorHomeAddr: {},
    payorInfo: {},
    payorOccupation: {},
    payorPdpa: {},
    productInfo: {},
    productInfoBasicPlan: {},
    productInfoRiders: [],
    taxConsent: {},
    uploadDocuments: {
      uploadDocOption: 'Online',
      uploadDocList: [],
    },
    openModal: false,
    compressedConfig: {
      quality: 1,
      maxWidth: 0,
      enableCompress: false,
    },

    insuredHQ: {},
    payorHQ: {},
    healthQuestionPA: {},
  },
  caseInfo: {},
  uploadFilesStatus: {},
  uploadFiles: [],
  successUploadFiles: [],
  tempUploadFiles: [],
  uploading: false,
  fieldConfigure: {},
  countryList: [],
  cityDict: {},
  productDetailList: [],
  selectedBasicPlan: {},
  productCodeList: [],
  riderProductCodeList: [],
} as const;

type DeepPartial<T> = {
  [P in keyof T]: T[P] extends object
    ? T[P] extends Array<any>
      ? T[P] // 保持数组类型
      : DeepPartial<T[P]> // 递归处理对象
    : T[P];
} & {
  [key: string]: string | number | boolean | null | undefined;
};
type State = DeepPartial<typeof defaultState>;

export default defaultState;
export type { State };
