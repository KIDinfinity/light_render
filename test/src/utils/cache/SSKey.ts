/**
 * 枚举 - SessionStorage缓存key
 */
export enum SSKey {
  /**
   * 系统配置（不要用户登录）
   */
  CONFIGS = 'venus-ui_config',
  /**
   * 用户配置（需要用户登录）
   */
  CONFIGS_LOGINED = 'venus-ui_config_logined',
  /**
   * 系统客服Email
   */
  SUPPORTEMail = 'venus-ui_systemSupportEmailAddress',
  /**
   * sso日志
   */
  SSOAUDITLOG = 'venus-ui_auditlog',
  /**
   * 权限日志
   */
  AUTONOTIC = 'venus-ui_auth_notic',
  /**
   * ssoc错误信息
   */
  SSOLOGIN_RESULT = 'venus-ui_ssoLoginResult',
  /**
   * 精度配置
   */
  ACCURACY_CONFIG = 'venus-ui_accuracy_config',
  /**
   * login/logout tat trance id
   */
  TAT_TRANCE_ID = 'TAT_TRANCE_ID',
  /**
   * 数据字典
   */
  DICTIONARY = 'venus-ui_dictionary',
  DICTIONARYDOWN = 'venus-ui_dictionary_Down',
  UserManagement_Tab = 'usermanagement_tab',
  USER_ID = 'venuis_ui_user.id',
  DashBoard = 'venus-ui_dashboard',
  TaskMode = 'venus-ui_temporary_default_task_mode',
  ListAllConfigurablePageInfo = 'venus-ui_ListAllConfigurablePageInfo',
  ListPermissionMenu = 'venus-ui_ListPermissionMenu',

  ELEMENT_CONFIG_MAP = 'ELEMENT_CONFIG_MAP',
  HEADLABEL_CONFIG_MAP = 'HEADLABEL_CONFIG_MAP',
  TASKSKIPVAILDATE = 'venus-ui-task-skip-vaildate',

  CUSTOMER_TYPE_CONFIG = 'CUSTOMER_TYPE_CONFIG',
}
