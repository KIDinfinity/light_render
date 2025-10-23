import moment from 'moment';

export default (state: any) => {
  return {
    ...state,
    functionData: {},
    listPage: {},
    importLoading: false,
    formData: {},
    headerData: {
      effectiveDate: moment().format(),
    },
    changeData: [],
    showFormData: true,
    isUpdateMultiple: false,
    isAdd: false,
    isUpdate: false,
    showExcelModal: false,
    excelData: {},
    originRows: [],
    versionList: [],
  };
};
