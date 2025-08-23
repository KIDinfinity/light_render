enum TaskDefKey {
  // Quality Control
  CP_ACT001 = 'CP_ACT001',
  //
  CP_ACT002 = 'CP_ACT002',
  // Manual Assessment
  CP_ACT003 = 'CP_ACT003',
  // Manual Approval
  CP_ACT004 = 'CP_ACT004',
  //
  CP_ACT005 = 'CP_ACT005',
  // Identify Hospital Billing
  TH_HB_ACT001 = 'TH_HB_ACT001',
  // Document Dispatch / 書類送付
  JP_DD_ACT001 = 'JP_DD_ACT001',
  // Apply For Leave
  BP_AL_ACT001 = 'BP_AL_ACT001',
  // Leave Request Approval
  BP_AL_ACT002 = 'BP_AL_ACT002',
  // Case Creation
  BP_VAN_ACT001 = 'BP_VAN_ACT001',
  //
  ACT00301 = 'ACT00301',
  //
  ACT00302 = 'ACT00302',
  // Data Capture
  PH_CLM_ACT001 = 'PH_CLM_ACT001',
  // Claim Assessment
  PH_CLM_ACT002 = 'PH_CLM_ACT002',
  // Claim Approval
  PH_CLM_ACT003 = 'PH_CLM_ACT003',
  // QC
  PH_CLM_ACT004 = 'PH_CLM_ACT004',
  // Get CTA and Check Information
  PH_CLM_ACT005 = 'PH_CLM_ACT005',
  //
  PH_CLM_ACT006 = 'PH_CLM_ACT006',
  // Identify Hospital Batch
  TH_IHB_ACT001 = 'TH_IHB_ACT001',
  //
  CC_DI_A01 = 'CC_DI_A01',
  //
  CC_DI_A02 = 'CC_DI_A02',
  // Unknown Document / 未知書類管理
  BP_UD_ACT001 = 'BP_UD_ACT001',
  //
  TH_DOC_ACT001 = 'TH_DOC_ACT001',
  //
  TH_DOC_ACT002 = 'TH_DOC_ACT002',
  //
  activitytest001 = 'activitytest001',
  // Data Capture
  dataCapture = 'dataCapture',
  // Quality Control
  qualityControl = 'qualityControl',
  //
  autoAssessment = 'autoAssessment',
  // Manual Assessment
  manualAssessment = 'manualAssessment',
  // Claim Approval
  claimApproval = 'claimApproval',
  // Data Configuration / データの配置
  BP_DT_ACT001 = 'BP_DT_ACT001',
  // Permission Change Approval / データ配置の査定
  BP_DT_ACT002 = 'BP_DT_ACT002',
  // Identify Unknown Document
  TH_UD_ACT001 = 'TH_UD_ACT001',
  //
  BP_NB_ACT001 = 'BP_NB_ACT001',
  //
  BP_NB_ACT002 = 'BP_NB_ACT002',
  //
  BP_NB_ACT003 = 'BP_NB_ACT003',
  //
  BP_NB_ACT004 = 'BP_NB_ACT004',
  //
  BP_NB_ACT005 = 'BP_NB_ACT005',
  //
  BP_NB_ACT006 = 'BP_NB_ACT006',
  //
  BP_NB_ACT007 = 'BP_NB_ACT007',
  //
  BP_NB_ACT009 = 'BP_NB_ACT009',
  //
  PH_CLMUW_ACT001 = 'PH_CLMUW_ACT001',
  //
  PH_POS_ACT010 = 'PH_POS_ACT010',
  //
  PH_POS_ACT009 = 'PH_POS_ACT009',
  //
  PH_POS_ACT005 = 'PH_POS_ACT005',
  //
  PH_POS_ACT007 = 'PH_POS_ACT007',
  // Permission Maintenance / 権限管理
  BP_UP_ACT001 = 'BP_UP_ACT001',
  // Permission Change Approval / 権限変更決裁
  BP_UP_ACT002 = 'BP_UP_ACT002',
  // Data             Capture
  PH_POS_ACT001 = 'PH_POS_ACT001',
  // Underwriting
  PH_POS_ACT002 = 'PH_POS_ACT002',
  // Approval
  PH_POS_ACT003 = 'PH_POS_ACT003',
  // Quality             Check
  PH_POS_ACT004 = 'PH_POS_ACT004',
  // In             Force
  PH_POS_ACT006 = 'PH_POS_ACT006',
  // Claim Request / Claim Request
  BP_CLM_ACT001 = 'BP_CLM_ACT001',
  //
  BP_AP_ACT003 = 'BP_AP_ACT003',
  //
  BP_AP_ACT004 = 'BP_AP_ACT004',
  //
  BP_AP_ACT005 = 'BP_AP_ACT005',
  //
  BP_AP_ACT006 = 'BP_AP_ACT006',
  // Appeal Manual Assessment
  BP_AP_ACT001 = 'BP_AP_ACT001',
  // Appeal Approval
  BP_AP_ACT002 = 'BP_AP_ACT002',
  //
  activitytest002 = 'activitytest002',
  //
  TH_CLM_ACT001 = 'TH_CLM_ACT001',
  //
  TH_CLM_ACT002 = 'TH_CLM_ACT002',
  //
  TH_CLM_ACT003 = 'TH_CLM_ACT003',
  //
  TH_CLM_ACT004 = 'TH_CLM_ACT004',
  //
  TH_CLM_ACT005 = 'TH_CLM_ACT005',
  //
  TH_CLM_ACT006 = 'TH_CLM_ACT006',
  //
  TH_CLM_ACT007 = 'TH_CLM_ACT007',
  // Post QC
  TH_CLM_ACT008 = 'TH_CLM_ACT008',
  // Edit Rule
  BP_RUL_ACT001 = 'BP_RUL_ACT001',
  // Rule Set Approval
  BP_RUL_ACT002 = 'BP_RUL_ACT002',
  // Rule Set Publishing
  BP_RUL_ACT003 = 'BP_RUL_ACT003',
  // Hospital Batch Assessment
  TH_IHA_ACT001 = 'TH_IHA_ACT001',
  // Error Identification
  BP_IE_ACT001 = 'BP_IE_ACT001',
  // Fire Fight
  BP_IE_ACT002 = 'BP_IE_ACT002',
  //
  RUWP_ACT001 = 'RUWP_ACT001',
  // Data Capture
  BP_SRV_ACT001 = 'BP_SRV_ACT001',
  //
  BP_SRV_ACT004 = 'BP_SRV_ACT004',
  // Servicing Decision
  BP_SRV_ACT002 = 'BP_SRV_ACT002',
  // Auto Completion
  BP_SRV_ACT003 = 'BP_SRV_ACT003',
  // Major Claim
  TH_MC_ACT001 = 'TH_MC_ACT001',
  // General POS
  BP_POS_ACT002 = 'BP_POS_ACT002',
  // Financial Economic Crime Approval
  BP_FEC_ACT001 = 'BP_FEC_ACT001',
  BP_FEC_ACT002 = 'BP_FEC_ACT002',
  // Data Capture
  BP_PAPER_ACT001 = 'BP_PAPER_ACT001',
}

export default TaskDefKey;
