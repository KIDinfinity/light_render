export default {
  // 这个字段用于离开当前路由是否清除数据,以后需要根据条件
  reset: true,
  params: {
    inquiryBusinessNo: null,
    policyOwnerName: null,
    insuredName: null,
    submissionDate: [],
    documentNo: null,
  },
  result: [],
  searchNo: '',
  taskData: {
    showFilter: false,
    list: [],
    total: 0,
    current: 1,
  },
  searched: false,
  applicationNo: '',
  searchNoObj: {},
  configurationItem: {
    categoryCode: '',
    name: '',
    modalTab: '',
  },
};
