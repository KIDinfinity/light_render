import moment from 'moment';

export default (state: any) => {
  return {
    ...state,
    functionData: {},
    previewRecord: {},
    userGroupList:[],
    roleList:[],
    headerData: {
      effectiveDate: moment().format(),
      expiryDate: moment('2999-12-31').format(),
    },
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
    allPermissionInfo: [],
    allRoleLists: {},
    currentMenu: {},
  };
};
