import moment from 'moment';

export const PAGE: number = 1;
export const PAGESIZE: number = 10;

export const FunCCCode = 'Fun_CC'; // 配置中心
export const FunMetadataCode = 'Fun_Metadata'; // 元数据
export const FunDatasourceCode = 'Fun_Datasource'; //  数据源
export const FunFunctionMenuCode = 'Fun_Function_Menu'; // 功能项

export const FunDataImageManagerCode = 'Fun_Data_Image_Manager'; // 数据版本管理
export const FunBatchRunTimeCode = 'Fun_Bacth_Runtime'; // 变更审核
export const FuncHistoryCode = 'Fun_Batch_History'; // 变更历史
export const FunDataImageControl = 'Fun_Data_Image'; // 数据版本控制
export const FunDataImageCode = 'Fun_Data_Image_Library'; // 数据版本

export const ShowImageCode = [FunBatchRunTimeCode];
export const FuncMenu = [FunCCCode, FunDataImageManagerCode];
export const FuncMenuImage = [FunDataImageCode, FunDataImageControl];

// eslint-disable-next-line import/named
export const Format = {
  date: 'YYYY-MM-DD',
  date_time: 'YYYY-MM-DD HH:mm:ss',
  date_range: 'YYYY-MM-DD',
};
export const Tabs = ['bussiness', 'dataVersion'];

export const ShowSearchIdx = 8; // 搜索index > 6 的 折叠隐藏

// 表格列宽限制
export const ColumnWidth = {
  max: 500,
  min: 40,
  common: 120,
};
export const RenderText = {
  text: (text: any) => text,
  number: (num: any) => num,
  boolean: (el: boolean) => (el ? 'true' : 'false'),
  date: (date: any) => (date ? moment(date).format('L') : ''),
  date_time: (date: any) => (date ? moment(date).format('L LTS') : ''),
  date_default: (date: any) => {
    return date ? moment(date).format('YYYY-MM-DD') : '';
  },
};

// 版本field, draft外 edit 重置
export const DataImageField = [
  'cc_effective_time',
  'cc_expect_effective_date',
  'cc_expect_expiry_date',
  'cc_expiry_time',
  'cc_urgent_process',
];

// excel， download 过滤字段
export const DownLoadFilter = ['cc_expiry_time', 'cc_effective_time'];
export const FilterSortField = 'default_sort';

export const VersionJsonField = ['originalData', 'original_data', 'newData', 'new_data'];
export const ChangeContentField = ['changeContent', 'change_content'];

export const WhereOperator = {
  equal_to: 'equal_to', // =
  great_than: 'great_than', // >
  less_than: 'less_than', // <
  like: 'like', // like
  between: 'between', // between
  leftLike: 'like ?%',
  rightLike: 'like %?',
  middleLike: 'like %?%',
  in: 'in',
};

export const SortFormat = {
  ascend: 'asc',
  descend: 'desc',
};
// 导出Liquibase 结构
export const ExportLiquibaseType = [
  {
    dictCode: 'all',
    dictName: 'All',
  },
  {
    dictCode: 'structure',
    dictName: 'Structure',
  },
  {
    dictCode: 'data',
    dictName: 'Data',
  },
];
// 页码
export const LiquibasePage = ['1000', '2000', '5000'];
// sql类型
export const SQLCategory = [
  {
    dictCode: 'DDL',
    dictName: 'DDL',
  },
  {
    dictCode: 'DML',
    dictName: 'DML',
  },
];
