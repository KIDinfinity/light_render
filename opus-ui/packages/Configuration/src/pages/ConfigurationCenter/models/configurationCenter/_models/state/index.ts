export default {
  dataImageActive: false,
  title: '',
  mode: 'table', // table, register
  confirmLoading: false,
  showModal: false, // 弹窗
  modalType: '', // add / update
  current: {}, // 当前编辑数据
  functionData: {}, // 配置数据
  resultData: {}, // 列表数据
  searchDefault: {},
  searchParams: {},
  isShowImageField: false, // 显示image field
  parentVersionNo: null,
  currentRecord: {},
  expandedRows: [],
  liquibaseFiles: [],
  selectedLiquibaseFileName: [],
  showLiquibaseFileModal: false,
  showSQLModel: false,
  SQLDatasourceName: undefined,
  showCopyModal: false,
  showDataPatchModal: false,
  dataPatchPromise: () => {},
};
