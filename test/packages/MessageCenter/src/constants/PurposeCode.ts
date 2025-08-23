export enum PurposeCode {
  /**
   * 接收到新的聊天信息，所以要创建会话、更新会话，如果阅读了，还要更新会话状态
   */
  NewChatMessage = 0,
  /**
   * SmartCircle信息
   */
  SmartCircle = 10,
  /**
   * 更新聊天状态
   */
  ChatStatus = 20,
  /**
   * 如果是在理赔页，UD信息
   * 如果不是在理赔页，SmartCircle信息
   */
  UD = 30,
  /**
   * 待确认
   */
  A = 40,
  /**
   * 待确认
   */
  B = 50,
  /**
   * 更新taskList
   */
  taskList = 101,
  /**
   * 更新envoyList
   */
  envoyList = 102,
  /**
   * 更新envoyList
   */
  caseLabel = 107,
  /**
   * 更新service
   */
  publicService = 501,
  /**
   * 取消service
   */
  cancelService = 502,
  /**
   * kickOut service
   */
  kickOutService = 503,

  MWReLoadBizDataSkipSnapshot = 'MWReLoadBizDataSkipSnapshot',

  ShareChequeSaved = 103,

  ShareChequeVerified = 104,
  OCRMessage = 105,

  findStorage = 106,

  refreshEnvoy = 999,

  refreshIntegrationChecklist = 110,

  refreshPremium = 111,
}
