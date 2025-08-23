import { Mode } from '../../Enum';

export default {
  functionData: {},
  currentMenu: {},
  listPage: {},
  showModal: false,
  menu: [],
  menuTemp: [],
  searchLoading: false,
  resetLoading: false,
  taskLoading: false,
  checkAll: false,
  previewModal: false,
  previewRecord: {},
  searchDefaultTemp: {},
  isPreview: false,
  dataImage: {},
  versionList: [],
  mode: Mode.Abbreviated,
  underAuditData: {},
  importLoading: false,
  excelData: {}, // excel预览
  showExcelModal: false,
  showLiquibaseModal: false,
  importErrors: {
    rowData: [],
    columns: [],
  },
  importRes: {},
  rows: [],
};
