export default {
  statusFilterList: [],
  statusFilter: '',

  modeList: [], // mode list
  currentMode: '', // current default mode
  prevMode: '', // prev default mode

  enterActive: false, // mode button enter is actived or not
  mode: 'dashboard', // active mode

  selectedRowKeys: [], // table selectedRowKeys
  filterList: [], // case category
  filterReasonList: [], // reason
  filterParams: {},
  filterState: '',
  dashboardData: {
    show: false,
    currentTab: 'Claim',
    datas: {}
  }

};
