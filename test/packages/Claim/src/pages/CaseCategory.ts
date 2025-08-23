// eslint-disable-next-line no-shadow
export enum CaseCategory {
  /**
   * 基础产品
   */
  BasicProduct = 'CLAIM REQUEST',
  /**
   * xx - 索赔上诉流程 (Document Dispatch)
   */
  AppealCase = 'BP_AP_CTG01',

  /**
   * 泰国 - 入院预申请流程 (Admit Pre-certification)
   */
  ThaiAP = 'IAPC',
  /**
   * 泰国 - 出院结账批准流程 (Discharge Approval)
   */
  ThaiDA = 'IDAC',
  /**
   * 泰国 - (Identify Hospital Billing)
   */
  ThaiHB = 'TH_GC_CTG05',
  /**
   * 泰国 - (MJ)
   */
  ThaiMJ = 'TH_MC_CTG01',

  /**
   * 日本 - 事故受付流程 (Document Dispatch)
   */
  DP = 'JP_DD_CTG01',
  /**
   * 日本 - 日本CLM (CLM)
   */
  CLM = 'JP_CLM_CTG01',
  /**
   * 日本 - 事情决裁
   */
  PA = 'JP_PA_CTG01',
  /**
   * 基础 - unknown document
   */
  UDOC = 'BP_UD_CTG01',

  /**
   * Simplified Claim Process
   */
  SimplifiedClaim = 'BP_CLM_CTG001',

  /**
   * 权限变更流程
   */
  UserPermission = 'BP_UP_CTG001',

  /**
   * 医的確認流程 【 Medical Confirmation 】
   */
  MedicalConfirm = 'JP_MC_CTG01',

  /**
   * Product Cancellation Process
   */
  ProductCancellation = 'JP_CP_CTG001',

  /**
   * 支払後検証プロセス Claim Payment Check
   */
  ClaimPaymentCheck = 'JP_PC_CTG01',

  /**
   *  配置中心 - Data maintenance
   */

  MaintenanceConfiguration = 'BP_DT_CTG01',
  /**
   *   配置中心 - Configure User Group
   */
  UserConfiguration = 'BP_DT_CTG03',
  /**
  *   配置中心 - Configure User Group
  */
  UserGroupConfiguration = 'BP_DT_CTG04',
  /**
  *   配置中心 - Configure User Group
  */
 RoleConfiguration = 'BP_DT_CTG05',
  /**
   * 基础 - 规则流程
   */
  RulesCreate = 'BP_RUL_CTG001',
  /**
   * 基础 - 规则流程
   */
  RulesChange = 'BP_RUL_CTG002',
}

export default CaseCategory;
