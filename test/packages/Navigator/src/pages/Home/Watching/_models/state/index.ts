export default {
  statusFilterList: [],
  statusFilter: '',

  modeList: [], // mode list
  currentMode: '', // current default mode
  prevMode: '', // prev default mode

  enterActive: false, // mode button enter is actived or not
  mode: 'dashboard', // active mode

  homeTableVersion: 'default',

  dashboardHidden: false,

  expandTabHidden: true,

  selectedRowKeys: [], // table selectedRowKeys
  filterList: [], // case category
  filterReasonList: [], // reason
  filterChannelList: [], // Channel
  filterParams: {},
  filterState: '',
  dashboardData: {
    show: false,
    currentTab: 'Claim',
    datas: {},
  },
  firstLoading: true,
};
