import moment from 'moment';
import { Mode } from 'configuration/constant';

export default {
  functionData: {},
  listPage: {},
  mode: Mode.Abbreviated,
  importLoading: false,
  formData: {},
  headerData: {
    effectiveDate: moment().format(),
    expiryDate: moment('2999-12-31').format(),
  },
  showDuplicate: true,
  changeData: [],
  showFormData: true,
  isUpdateMultiple: false,
  isAdd: false,
  isUpdate: false,
  showExcelModal: false,
  excelData: {},
  showTableList: true,
  showWarnModal: false,
  confirm: false,
  warnConfirm: false,
  TableSearch: {},
  sortOrders: {},
  originRows: [],
  versionList: [],
};
