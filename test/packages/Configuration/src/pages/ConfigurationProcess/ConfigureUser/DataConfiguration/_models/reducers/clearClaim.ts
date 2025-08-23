import moment from 'moment';
import { Mode } from 'configuration/constant';

export default (state: any) => {
  return {
    ...state,
    functionData: {},
    previewRecord: {},
    userList: [],
    mode: Mode.Abbreviated,
    headerData: {
      effectiveDate: moment().format(),
      expiryDate: moment('2999-12-31').format(),
    },
    showTableList: true,
    permissionList: [],
    listPage: {},
    importLoading: false,
    formData: {},
    showDuplicate: true,
    changeData: [],
    showFormData: true,
    isUpdateMultiple: false,
    isAdd: false,
    isUpdate: false,
    showExcelModal: false,
    excelData: {},
    showWarnModal: false,
    confirm: false,
    warnConfirm: false,
    TableSearch: {},
    sortOrders: {},
    originRows: [],
    versionList: [],
    allGroupInfo: [],
    allOrganization: [],
    allRolePermissions: {},
    allGroupUsers: {},
    currentMenu: {},
  };
};
