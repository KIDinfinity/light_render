export interface DropDownProps {
  dropdownDatas: any[];
  fieldName: string;
}

export interface CascaderProps {
  cascaderDatas: any[];
  fieldName: string;
}

export interface SortOrderProps {
  sortName: string;
  sortOrder: string;
}

export interface DataFieldProps {
  functionId: string;
  editable: boolean;
  componentCaption: string;
  columnSize: string;
  componentSize: string;
  componentType: string;
  fieldCaption: string;
  description: string;
  fieldName: string;
  loading: boolean;
  visible: boolean;
  orderType: string;
  required: boolean;
  defaultValue: any;
  fieldNameArray: string[];
  dropdown: DropDownProps;
  dropdownDatas: any[];
  simple?: boolean;
  checked?: boolean;
  whereOperator?: any;
  likeLimit: null | number;
  reportCode?: string;
  layout?: any;
  format?: string;
}

export interface SearchComponentProps {
  isRangQuery: string | boolean;
  defaultValue: any;
  componentType: string;
  fieldName: string;
  fieldNameArray: string[];
  whereOperator: string;
}

export interface DataVersionProps {
  parentVersionNo?: string | null;
  versionNo: string;
  status: string;
  changeContent: string | null;
  newData: string;
  id: string;
}

export interface CurrentMenuProps {
  functionName: string;
  functionCode: string;
  id: string;
  visible: string;
  dataImageActive: boolean;
  subFunctionList: CurrentMenuProps[];
  dataFieldList: DataFieldProps[];
}

export interface FunctionDataProps {
  id: string;
  functionCode: string;
  dataFieldList: DataFieldProps[];
  operationList: string[];
  operation: string;
  searchComponentList: SearchComponentProps[];
  defaultSort: string;
}

export interface FileProps {
  fileName: string;
  fileSize: string;
  modificationTime: string;
}

export interface ExcelDataProps {
  rowData: any[];
  columns: any[];
  fileInfoVO: FileProps;
  errorMessage: any[];
}

export interface ResultDataProps {
  rows: any[];
  currentPage: number;
  pageSize: number;
}

export interface PayProps {
  payload: any;
}
export interface SagaProps {
  put: any;
  call: any;
  select: any;
  take: any;
  takeLatest: any;
}
