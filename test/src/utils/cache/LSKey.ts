/**
 * 枚举 - LocalStorage缓存key
 */
export enum LSKey {
  /**
   * 语言
   */
  LANGUAGE = 'venus-ui_language',
  /**
   * 用户信息
   */
  CURRENTUSER = 'venus-ui_currentUser',
  /**
   * 鉴权配置
   */
  AUTHORITY = 'venus-ui-authority',
  /**
   * 节点
   */
  ACTIVITY_CODE = 'venus-ui_activityCode',
  /**
   * 节点状态
   */
  ACTIVITY_STATUS = 'venus-ui_activityStatus',
  /**
   * 流程
   */
  CASE_CATEGORY = 'venus-ui_caseCategory',
  /**
   * 数据字典(TODO:这个需要去掉)
   */
  DICTIONARY = 'venus-ui_dictionary',
  /**
   * 当前用户角色
   */
  CURRENTUSERROLES = 'venus-ui_currentUserRoles',
  /**
   * 聊天列表
   */
  CHATLIST = 'venus-ui_chatList',
  /**
   * 群组聊天列表
   */
  GROUPCHATLIST = 'venus-ui_groupChatList',
  /**
   * 当前token
   */
  WTOKEN = 'venus-ui_wtoken',
  /**
   * Env
   */
  PROXY = 'venus-ui_PROXY',
  /**
   * 主题
   */
  THEME = 'theme',
  /**
   * 当前tbl search 的位置和大小
   */
  TBLSEARCH_LOCATION = 'TBLSEARCH_LOCATION',
  /*
   * task 详情页提交等操作之后应回到的上一个页面
   */
  TASK_PRE_HISTORY = 'TASK_PRE_HISTORY',
  /*
   * task 详情点击返回之后应回到的上一个页面
   */
  PROPOSAL_PRE_HISTORY = 'PROPOSAL_PRE_HISTORY',
  /*
   * 登录成功后，登录方式信息的缓存
   */
  LOGIN_MODE = 'venus-ui_login_mode',
  /**
   * 服务信息
   */
  SERVICE_EXCEPTION = 'venus-ui_service_exception',
  /**
   * dashboard chart
   */
  Dashboard = 'venus-ui_dashboard',
  DashboardConmmon = 'venus-ui_dashboardCommon',
  DashboardVersion = 'venus-ui_dashboardVersion',
  DISABLEICONTIP = 'disableIconTip',
  AUTHORITYCONTRL = 'venus-ui-authorityControl',

  homeTableVersion = 'venus-ui_homeTableVersion',

  /**
   * 首页筛选条件
   */
  NAVIGATOR_CASE_FILTER = 'venus-ui_navigator_case_filter',
  /**
   * opus记住用户账号
   */
  OPUS_REMEMBER_USER = 'venus-ui_opus_login_remember_user',

  /**support center用户记录 */
  SUPPORT_CENTER_REMEMBER_USER = 'venus-ui_support_center_login_remember_user',

  ENV_LIST = 'region_list',

  HOST = 'support_center_host',

  HOST_REGION = 'support_center_host_region',
  /**
   * 用户上次的登录路径
   */
  LAST_TIME_LOGIN_PATHANME = 'LAST_TIME_LOGIN_PATHANME',

  CONFIG_MENUDATA = 'venus-ui_config_menudata',
  DOCUMENT_POLICYNO = 'document_policy',
  REASSESSMENTTIMER = 'reAssessmentTimer',
  VENUS_UI_SQLQUERYPARAMS = 'venus-ui_sqlQueryParams',

  /**
   * 跨窗口通信
   *
   */
  WINDOW_COMMUNICATION_READ_DOC = 'WINDOW_COMMUNICATION_READ_DOC',

  /**
   * 自动trigger 打开侧边栏
   *
   */
  AUTO_TRIGGER_SIDERBAE_CONFIG = 'AUTO_TRIGGER_SIDERBAE_CONFIG',
}
