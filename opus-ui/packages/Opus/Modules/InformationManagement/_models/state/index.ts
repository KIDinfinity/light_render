export default {
  submitInfo: {
    /*
    [groupCode]: {
      infoCategoryCode: '',
      infoCategoryLinkTo: '',
      comment: '',
      policyIds: [],
    },
    */
  },
  curGroupCode: '',
  curCategoryCode: '',
  groupCodes: [],
  informationGroups: {},
  infoHistory: [],
  activityCategory: {},
  classification: {
    caseNo: '',
    insuredId: null,
    policyIdList: [],
  },
  generateUWWorksheetModal: {},
  caseInfo: {},
  //新添加的auditLog相关状态
  auditLogPagination: {
    currentPage: 1,
    pageSize: 20,
    sortName: 'date',
    sortOrder: 'desc',
    hasMore: false,
  },
  auditList: [],
  colorDict: {},
  //auditLogstate结束
};
