export default {
  currentTab: '1',
  showSearchVisible: true, // 搜索框

  chatWindowVisible: false,
  chatOffline: false,
  loadingReconnect: false,
  sessionId: '',
  chatStatus: 0,
  currentChatInfo: {},
  currentChatMessages: [],
  currentChatMessagesPagination: {
    currentPage: 1,
    pageSize: 20,
  },
  currentChatMessagesIsUpdateNew: true,
  currentSendingMessage: '',

  isReconnect: false,
  webSocket: null,

  chatWindowHistVisible: false,

  showSeachBox: false,
  keyword: '',
  hist: {
    listData: [],
    pagination: {},
    hasMore: true,
  },
  histList: {
    listData: [],
    pagination: {},
  },
  histSingleList: {
    listData: [],
    pagination: {},
  },
  // 聊天窗口
  showContextMenu: false, // 右键自定义菜单显示
  showMultiSelect: false, // 是否是多选
  archiveList: {
    archiveListInIt: [],
  }, // 多选的数据
  isShowArchive: false,
  // 聊天SearchFrame组件应该展示哪个子组件
  searchShowComp: {
    isShowContact: true,
    isShowChatHist: true,
    isShowChatHistList: false,
    isShowChatSingleHistList: false,
    isShowHistMore: true,
    goFirst: false,
    params: {},
    showListNum: '',
    goBackHist: false,
  },
  defaultSearchShowComp: {
    goBackHist: false,
    goFirst: false,
    isShowChatHist: true,
    isShowChatHistList: false,
    isShowChatSingleHistList: false,
    isShowContact: true,
    isShowHistMore: true,
    params: {},
    showListNum: '',
  },
};
