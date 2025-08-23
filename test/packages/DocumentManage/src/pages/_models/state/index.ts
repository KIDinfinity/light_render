import { EToolModules } from '../../_dto/enums';
import { ESubjectType } from '@/components/SolutionRead/Enums';

export const listenerTools = [EToolModules.edit, EToolModules.void, EToolModules.download];

export const toolDataInit = {
  selected: false,
  disabled: false,
  unSelectable: false,
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
  image: '',
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

export const fileInit = {
  fileId: 'fileId',
  fileName: '',
  mimeType: '',
  filePath: '',
  fileBinary: null,
};

export default {
  documentList: [],
  docMandatoryList: [],
  selectedDocId: '',
  selectedId: '',
  searchValue: '',
  toolsData: {
    [EToolModules.mandatory]: {
      ...toolDataInit,
    },
    [EToolModules.edit]: {
      ...toolDataInit,
      disabled: true,
    },
    [EToolModules.void]: {
      ...toolDataInit,
      disabled: true,
      noSelectedStatus: true,
    },

    [EToolModules.download]: {
      ...toolDataInit,
      disabled: true,
      noNeedAuthorize: true, // download button 不需要验证权限
    },
    [EToolModules.upload]: { ...toolDataInit },
    [EToolModules.view]: {
      ...toolDataInit,
    },
    [EToolModules.delete]: {
      ...toolDataInit,
      noNeedAuthorize: false,
    },
    [EToolModules.ocr]: {
      ...toolDataInit,
    },
    [EToolModules.reIndex]: {
      ...toolDataInit,
    },
  },
  fieldConfigure: {},
  dropdownConfigure: [],
  caseInfo: {},
  uploadFiles: [],
  imageUrl: '',
  dragging: false,
  uploading: false,
  docMandatoryChecking: {
    checked: false,
    reason: '',
  },
  clientObject: {},
  businessNoDocumentList: [],
  showType: 'caseNo',
  documentNum: 0,
  businessNoDocumentNum: 0,
  url: '',
  showFullScreen: false,
  ocrErrors: [],
  docIdConfig: [],
  selectedData: {
    selectedDocs: {},
    isClickSelectAll: false,
  },
  readItem: {
    docId: '',
    name: '',
    subjectType: ESubjectType.DOC,
    mustRead: false,
    unRead: false,
  },
  compressedConfig: {
    quality: 1,
    maxWidth: '',
    enableCompress: false,
  },
};
