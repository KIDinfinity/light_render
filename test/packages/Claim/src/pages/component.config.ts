import { Region } from '@/components/Tenant';
import CaseCategory from 'enum/CaseCategory';
import TaskDefKey from 'enum/TaskDefKey';
import { lazy } from 'react';

// 不可编辑页面
export const taskNotEditableKey = [
  TaskDefKey.qualityControl,
  TaskDefKey.claimApproval,
  TaskDefKey.JP_MC_ACT001,
  TaskDefKey.CP_ACT004,
  TaskDefKey.JP_CP_ACT001,
  TaskDefKey.JP_CP_ACT002,
  TaskDefKey.JP_CP_ACT003,
  TaskDefKey.JP_CLM_ACT004,
  TaskDefKey.JP_CLM_ACT005,
  TaskDefKey.JP_CLM_ACT006,
  TaskDefKey.JP_CLM_ACT007,
  TaskDefKey.JP_CLM_ACT008,
  TaskDefKey.JP_CLM_ACT009,
  TaskDefKey.BP_UP_ACT002,
  TaskDefKey.JP_PA_ACT001,
  TaskDefKey.JP_PA_ACT002,
  TaskDefKey.JP_PC_ACT001,
  TaskDefKey.BP_DT_ACT002,
  TaskDefKey.PH_CLM_ACT003,
  TaskDefKey.PH_CLM_ACT004,
  TaskDefKey.PH_CLM_ACT005,
  TaskDefKey.PH_CLM_ACT006,
  TaskDefKey.HK_CLM_ACT004,
  TaskDefKey.HK_CLM_ACT005,
  TaskDefKey.HK_CLM_ACT008,
  TaskDefKey.BP_AP_ACT002,
  TaskDefKey.BP_IE_ACT002,
  TaskDefKey.TH_IHA_ACT001,
  TaskDefKey.TH_CLM_ACT008,
  TaskDefKey.BP_NB_ACT008,
  TaskDefKey.ID_CLM_ACT001,
  TaskDefKey.BP_CLM_ACT002,
  TaskDefKey.HK_CR_ACT002,
  TaskDefKey.VN_UW_ACT001,
  TaskDefKey.BP_DD_ACT002,

  TaskDefKey.NB_UW_ACT001,
  TaskDefKey.NB_UW_ACT002,

  TaskDefKey.BP_CLM_ACT005,
  TaskDefKey.BP_CLM_ACT006,
  TaskDefKey.PH_CLMUW_ACT001,
];
export default [
  {
    caseCategory: CaseCategory.Claim_Request,
    taskDefKey: {
      dataCapture: lazy(() => import('../../../ClaimBasicProduct/src/pages/DataCapture/Entry')),
      qualityControl: lazy(() =>
        import('../../../ClaimBasicProduct/src/pages/QualityControl/Entry')
      ),
      manualAssessment: lazy(() =>
        import('../../../ClaimBasicProduct/src/pages/ManualAssessment/Entry')
      ),
      claimApproval: lazy(() => import('../../../ClaimBasicProduct/src/pages/ClaimApprove/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.PH_AP_CTG01,
    taskDefKey: {
      BP_AP_ACT001: lazy(() => import('./AppealCase/ManualAssessment/Entry')),
      BP_AP_ACT002: lazy(() => import('./AppealCase/ManualAssessment/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.IAPC,
    taskDefKey: {
      CP_ACT001: lazy(() => import('./Thailand/ProcessOfAP/APOfQualityControl/Entry')),
      CP_ACT003: lazy(() => import('./Thailand/ProcessOfAP/APOfAssessment/Entry')),
      CP_ACT004: lazy(() => import('./Thailand/ProcessOfAP/APOfAssessment/Entry')),
    },
  },
  {
    caseCategory: [
      // 出院结账批准流程  【 Discharge Approval 】
      CaseCategory.IDAC,
      CaseCategory.TH_GC_CTG01,
      CaseCategory.TH_GC_CTG02,
      CaseCategory.TH_GC_CTG03,
      CaseCategory.TH_GC_CTG04,
      CaseCategory.TH_GC_CTG06,
      CaseCategory.TH_GC_CTG07,
    ],
    taskDefKey: {
      CP_ACT001: lazy(() => import('./Thailand/ProcessOfDA/DAOfQualityControl/Entry')),
      CP_ACT003: lazy(() => import('./Thailand/ProcessOfDA/DAOfAssessment/Entry.Assessment')),
      CP_ACT004: lazy(() =>
        import('./Thailand/ProcessOfDA/DAOfAssessment/Entry.Assessment.Approval')
      ),
    },
  },

  {
    // 泰国流程
    caseCategory: CaseCategory.TH_MC_CTG01,
    taskDefKey: {
      TH_MC_ACT001: lazy(() => import('./Thailand/ProcessOfMJ/Claim/Entry')),
    },
  },
  {
    // Identify Hospital Billing

    caseCategory: CaseCategory.TH_GC_CTG05,
    taskDefKey: {
      TH_HB_ACT001: lazy(() => import('./Thailand/ProcessOfHB/HBOfAssessment/Entry')),
    },
  },

  {
    caseCategory: CaseCategory.TH_IHB_CTG01,
    taskDefKey: {
      TH_IHB_ACT001: lazy(() => import('./Thailand/ProcessOfIHB/IdentifyHospitalBatch/Entry')),
    },
  },

  {
    caseCategory: CaseCategory.JP_DD_CTG01,
    taskDefKey: {
      JP_DD_ACT001: lazy(() => import('./Japan/ProcessOfJPDP/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.JP_CLM_CTG01,
    taskDefKey: {
      JP_CLM_ACT001: lazy(() => import('./Japan/ProcessOfJPCLM/JPCLMOfClaimRegistration/Entry')),
      JP_CLM_ACT002: lazy(() => import('./Japan/ProcessOfJPCLM/JPCLMOfQualityControl/Entry')),
      JP_CLM_ACT004: lazy(() => import('./Japan/ProcessOfJPCLM/JPCLMOfAssessment/Entry')),
      JP_CLM_ACT005: lazy(() => import('./Japan/ProcessOfJPCLM/JPCLMOfAssessmentReview/Entry')),
      JP_CLM_ACT006: lazy(() => import('./Japan/ProcessOfJPCLM/JPCLMOfClaimApproval/Entry')),
      JP_CLM_ACT007: lazy(() => import('./Japan/ProcessOfJPCLM/JPCLMOfClaimApproval/Entry')),
      JP_CLM_ACT008: lazy(() => import('./Japan/ProcessOfJPCLM/JPCLMOfQualityControl/Entry')),
    },
  },
  {
    caseCategory: [CaseCategory.JP_CLM_CTG001, CaseCategory.JP_CLM_CTG002],
    taskDefKey: {
      JP_CLM_ACT001: lazy(() => import('process/JPCLM/DataCapture/Entry')),
      JP_CLM_ACT003: lazy(() => import('process/JPCLM/ManualAssessment/Entry')),
      JP_CLM_ACT004: lazy(() => import('process/JPCLM/ClaimApprove/Entry')),
      JP_CLM_ACT005: lazy(() => import('process/JPCLM/QualityControl/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.JP_CLM_CTG003,
    taskDefKey: {
      JP_CLM_ACT009: lazy(() => import('process/JPCLM/ManualAssessment/Entry')),
    },
  },
  {
    caseCategory: [CaseCategory.TH_CLM_CTG001, CaseCategory.TH_CLM_CTG002],
    taskDefKey: {
      TH_CLM_ACT001: lazy(() => import('process/THCLM/DataCapture/Entry')),
      TH_CLM_ACT004: lazy(() => import('process/THCLM/ManualAssessment/Entry')),
      TH_CLM_ACT005: lazy(() => import('process/THCLM/ClaimApprove/Entry')),
      TH_CLM_ACT006: lazy(() => import('process/THCLM/QualityControl/Entry')),
    },
  },
  {
    region: Region.TH,
    caseCategory: [CaseCategory.BP_PAPER_CTG002, CaseCategory.BP_CLM_CTG002],
    taskDefKey: {
      BP_PAPER_ACT001: lazy(() => import('process/THCLM/DataCapture/Entry')),
      BP_PAPER_ACT002: lazy(() => import('process/THCLM/DataCapture/Entry')),
      BP_CLM_ACT004: lazy(() => import('process/THCLM/ManualAssessment/Entry')),
      BP_CLM_ACT005: lazy(() => import('process/THCLM/ClaimApprove/Entry')),
    },
  },

  {
    caseCategory: CaseCategory.TH_CLM_CTG003,
    taskDefKey: {
      TH_CLM_ACT008: lazy(() => import('process/THCLM/ManualAssessment/Entry')),
    },
  },
  {
    region: Region.ID,
    caseCategory: [CaseCategory.BP_CLM_CTG002],
    taskDefKey: {
      BP_V2_CLM_ACT001: lazy(() => import('process/IDCLM/DataCapture/Entry')),
      BP_V2_CLM_ACT004: lazy(() => import('process/IDCLM/ManualAssessment/Entry')),
      BP_V2_CLM_ACT005: lazy(() => import('process/IDCLM/ClaimApprove/Entry')),
      BP_V2_CLM_ACT006: lazy(() => import('process/IDCLM/QualityControl/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.BP_CLM_CTG004,
    taskDefKey: {
      BP_V2_CLM_ACT008: lazy(() => import('process/IDCLM/ManualAssessment/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.ID_CLM_CTG001,
    taskDefKey: {
      ID_CLM_ACT001: lazy(() => import('process/IDCLM/ClaimInvestigation/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.BP_CLM_CTG005,
    taskDefKey: {
      BP_CLM_ACT002: lazy(() => import('process/HKCLM/ManualAssessment/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.JP_PA_CTG01,
    taskDefKey: {
      JP_PA_ACT001: lazy(() => import('./Japan/ProcessOfJPCLM/JPCLMOfAssessment/Entry')),
      JP_PA_ACT002: lazy(() => import('./Japan/ProcessOfJPCLM/JPCLMOfAssessment/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.BP_UD_CTG01,
    taskDefKey: {
      BP_UD_ACT001: lazy(() =>
        import('../../../ClaimBasicProduct/src/pages/UnknownDocument/Entry')
      ),
    },
  },
  {
    caseCategory: CaseCategory.BP_CLM_CTG001,
    taskDefKey: {
      BP_CLM_ACT001: lazy(() =>
        import('claimBasicProduct/pages/SimplifiedDigital/CaseCreation/Entry')
      ),
    },
  },
  {
    caseCategory: [CaseCategory.BP_VAN_CTG001, CaseCategory.BP_VAN_CTG002],
    taskDefKey: {
      BP_VAN_ACT001: lazy(() =>
        import('claimBasicProduct/pages/SimplifiedDigital/CaseCreation/Entry')
      ),
    },
  },

  {
    caseCategory: CaseCategory.BP_UP_CTG001,
    taskDefKey: {
      BP_UP_ACT001: lazy(() => import('./UserPermission/PermissionMaintenance/Entry')),
      BP_UP_ACT002: lazy(() => import('./UserPermission/PermissionMaintenance/Entry')),
    },
  },
  // Servicing Process
  {
    caseCategory: [CaseCategory.BP_SRV_CTG001, CaseCategory.BP_SRV_CTG002],
    taskDefKey: {
      BP_SRV_ACT001: lazy(() => import('process/BPSRV/DataCapture/Entry')), // todo 临时替换
      BP_SRV_ACT002: lazy(() => import('process/BPSRV/ServicingDecision/Entry')),
    },
  },
  // General POS
  {
    caseCategory: [
      CaseCategory.BP_PAPER_CTG001,
      CaseCategory.BP_SRV_CTG002,
      CaseCategory.BP_POS_CTG001,
      CaseCategory.BP_POS_CTG002,
      CaseCategory.BP_POS_CTG003,
      CaseCategory.BP_PT_CTG001,
      CaseCategory.BP_PAPER_CTG004,
      CaseCategory.BP_POS_CTG006,
      CaseCategory.BP_POS_CTG008,
      CaseCategory.BP_POS_CTG009,
      CaseCategory.BP_POS_CTG010,
    ],
    taskDefKey: {
      BP_PAPER_ACT001: lazy(() => import('process/GeneralPOS/DataCapture/Entry')),
      BP_PAPER_ACT002: lazy(() => import('process/GeneralPOS/DataCapture/Entry')),
      BP_SRV_ACT002: lazy(() => import('process/GeneralPOS/DataCapture/Entry')),
      BP_POS_ACT003: lazy(() => import('process/GeneralPOS/Decision/Entry')),
      BP_POS_ACT002: lazy(() => import('process/GeneralPOS/Decision/Entry')),
      BP_POS_ACT004: lazy(() => import('process/GeneralPOS/POSReview/Entry')),
      BP_POS_ACT005: lazy(() => import('process/GeneralPOS/POSReview/Entry')),
      BP_PT_ACT001: lazy(() => import('process/GeneralPOS/POSPaymentTrack/Entry')),
      BP_POS_ACT007: lazy(() => import('process/GeneralPOS/POSReview/Entry')),
    },
  },
  // 医的確認流程 【 Medical Confirmation 】
  {
    caseCategory: CaseCategory.JP_MC_CTG01,
    taskDefKey: {
      JP_MC_ACT001: lazy(() => import('./Japan/ProcessOfJPCLM/JPCLMOfAssessment/Entry')),
    },
  },
  // Product Cancellation Process
  {
    caseCategory: CaseCategory.JP_CP_CTG001,
    taskDefKey: {
      JP_CP_ACT001: lazy(() => import('./Japan/ProcessOfJPCLM/JPCLMOfAssessment/Entry')),
      JP_CP_ACT002: lazy(() => import('./Japan/ProcessOfJPCLM/JPCLMOfAssessment/Entry')),
      JP_CP_ACT003: lazy(() => import('./Japan/ProcessOfJPCLM/JPCLMOfAssessment/Entry')),
    },
  },
  // 支払後検証プロセス
  {
    caseCategory: CaseCategory.JP_PC_CTG01,
    taskDefKey: {
      JP_PC_ACT001: lazy(() => import('./Japan/ProcessOfJPCLM/JPCLMOfClaimApproval/Entry')),
    },
  },
  // 配置中心
  {
    caseCategory: CaseCategory.BP_DT_CTG01,
    taskDefKey: {
      [TaskDefKey.BP_DT_ACT001]: lazy(() =>
        import(
          '../../../Configuration/src/pages/ConfigurationProcess/DataMainTenanceForBusiness/DataConfiguration/Entry'
        )
      ),
      [TaskDefKey.BP_DT_ACT002]: lazy(() =>
        import(
          '../../../Configuration/src/pages/ConfigurationProcess/DataMainTenanceForBusiness/PermissionApproval/Entry'
        )
      ),
    },
  },
  // Configure User
  {
    caseCategory: CaseCategory.BP_DT_CTG03,
    taskDefKey: {
      [TaskDefKey.BP_DT_ACT001]: lazy(() =>
        import(
          '../../../Configuration/src/pages/ConfigurationProcess/ConfigureUser/DataConfiguration/Entry'
        )
      ),
      [TaskDefKey.BP_DT_ACT002]: lazy(() =>
        import(
          '../../../Configuration/src/pages/ConfigurationProcess/ConfigureUser/DataConfiguration/Entry'
        )
      ),
    },
  },
  // Configure Role
  {
    caseCategory: CaseCategory.BP_DT_CTG05,
    taskDefKey: {
      [TaskDefKey.BP_DT_ACT001]: lazy(() =>
        import(
          '../../../Configuration/src/pages/ConfigurationProcess/ConfigureRole/DataConfiguration/Entry'
        )
      ),
      [TaskDefKey.BP_DT_ACT002]: lazy(() =>
        import(
          '../../../Configuration/src/pages/ConfigurationProcess/ConfigureRole/DataConfiguration/Entry'
        )
      ),
    },
  },
  {
    caseCategory: CaseCategory.BP_DT_CTG04,
    taskDefKey: {
      [TaskDefKey.BP_DT_ACT001]: lazy(() =>
        import(
          '../../../Configuration/src/pages/ConfigurationProcess/ConfigureUserGroup/DataConfiguration/Entry'
        )
      ),
      [TaskDefKey.BP_DT_ACT002]: lazy(() =>
        import(
          '../../../Configuration/src/pages/ConfigurationProcess/ConfigureUserGroup/DataConfiguration/Entry'
        )
      ),
    },
  },
  /**
   * 规则
   */
  {
    caseCategory: CaseCategory.BP_RUL_CTG001,
    taskDefKey: {
      [TaskDefKey.BP_RUL_ACT001]: lazy(() => import('../../../RuleEngine/src/pages/Edit/Entry')),
      [TaskDefKey.BP_RUL_ACT002]: lazy(() => import('../../../RuleEngine/src/pages/Edit/Entry')),
      [TaskDefKey.BP_RUL_ACT003]: lazy(() => import('../../../RuleEngine/src/pages/Edit/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.BP_RUL_CTG002,
    taskDefKey: {
      [TaskDefKey.BP_RUL_ACT001]: lazy(() => import('../../../RuleEngine/src/pages/Edit/Entry')),
      [TaskDefKey.BP_RUL_ACT002]: lazy(() => import('../../../RuleEngine/src/pages/Edit/Entry')),
      [TaskDefKey.BP_RUL_ACT003]: lazy(() => import('../../../RuleEngine/src/pages/Edit/Entry')),
    },
  },
  /**
   * PHPOS , major, minor
   */
  {
    caseCategory: [CaseCategory.PH_POS_CTG001, CaseCategory.PH_POS_CTG002],
    taskDefKey: {
      [TaskDefKey.PH_POS_ACT001]: lazy(() => import('process/GeneralPOS/PHNotCFT/Entry')),
      [TaskDefKey.PH_POS_ACT002]: lazy(() => import('process/GeneralPOS/PHNotCFT/Entry')),
      [TaskDefKey.PH_POS_ACT003]: lazy(() => import('process/GeneralPOS/PHNotCFT/Entry')),
      [TaskDefKey.PH_POS_ACT004]: lazy(() => import('process/GeneralPOS/PHNotCFT/Entry')),
      [TaskDefKey.PH_POS_ACT005]: lazy(() => import('process/GeneralPOS/PHNotCFT/Entry')),
      [TaskDefKey.PH_POS_ACT006]: lazy(() => import('process/GeneralPOS/PHNotCFT/Entry')),
    },
  },
  // POS子流程 Payment Track
  {
    caseCategory: CaseCategory.PH_POS_CTG006,
    taskDefKey: {
      [TaskDefKey.PH_POS_ACT010]: lazy(() => import('../../../Phowb/src/pages/POS/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.PH_POS_CTG003,
    taskDefKey: {
      [TaskDefKey.PH_POS_ACT007]: lazy(() =>
        import('process/GeneralPOS/PHBatchCreateProcess/Entry')
      ),
    },
  },
  {
    caseCategory: CaseCategory.PH_CLM_CTG001,
    taskDefKey: {
      PH_CLM_ACT001: lazy(() => import('./Philippines/ProcessOfPHICLM/DataCapture/Entry')),
      PH_CLM_ACT002: lazy(() => import('./Philippines/ProcessOfPHICLM/ManualAssessment/Entry')),
      PH_CLM_ACT003: lazy(() => import('./Philippines/ProcessOfPHICLM/ClaimApproval/Entry')),
      PH_CLM_ACT004: lazy(() => import('./Philippines/ProcessOfPHICLM/QualityControl/Entry')),
      PH_CLM_ACT005: lazy(() => import('./Philippines/ProcessOfPHICLM/PendingForCTA/Entry')),
      PH_CLM_ACT006: lazy(() => import('./Philippines/ProcessOfPHICLM/ManualAssessment/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.PH_CLMUW_CTG001,
    taskDefKey: {
      PH_CLMUW_ACT001: lazy(() => import('process/PHCLM/ManualAssessment/Entry')),
    },
  },
  {
    region: Region.PH,
    caseCategory: [
      CaseCategory.BP_PAPER_CTG002,
      CaseCategory.BP_CLM_CTG008,
      CaseCategory.BP_CLM_CTG007,
      CaseCategory.BP_AP_CTG01,
    ],
    taskDefKey: {
      BP_PAPER_ACT001: lazy(() => import('process/PHCLM/DataCapture/Entry')),
      BP_PAPER_ACT002: lazy(() => import('process/PHCLM/DataCapture/Entry')),
      BP_AP_ACT001: lazy(() => import('process/PHCLM/ManualAssessment/Entry')),
      BP_AP_ACT002: lazy(() => import('process/PHCLM/ClaimApprove/Entry')),
      BP_CLM_ACT004: lazy(() => import('process/PHCLM/ManualAssessment/Entry')),
      BP_CLM_ACT005: lazy(() => import('process/PHCLM/ClaimApprove/Entry')),
      BP_CLM_ACT006: lazy(() => import('process/PHCLM/QualityControl/Entry')),
    },
  },
  {
    region: Region.MY,
    caseCategory: [
      CaseCategory.BP_PAPER_CTG002,
      CaseCategory.BP_CLM_CTG008,
      CaseCategory.BP_CLM_CTG007,
      CaseCategory.BP_CLM_CTG010,
    ],
    taskDefKey: {
      BP_PAPER_ACT001: lazy(() => import('process/MYCLM/DataCapture/Entry')),
      BP_PAPER_ACT002: lazy(() => import('process/MYCLM/DataCapture/Entry')),
      BP_AP_ACT001: lazy(() => import('process/MYCLM/ManualAssessment/Entry')),
      BP_AP_ACT002: lazy(() => import('process/MYCLM/ClaimApprove/Entry')),
      BP_CLM_ACT004: lazy(() => import('process/MYCLM/ManualAssessment/Entry')),
      BP_CLM_ACT005: lazy(() => import('process/MYCLM/ClaimApprove/Entry')),
      BP_CLM_ACT006: lazy(() => import('process/MYCLM/QualityControl/Entry')),
      BP_CLMPM_ACT001: lazy(() => import('process/MYCLM/ClaimPaymentTrack/Entry')),
    },
  },
  {
    region: Region.PH,
    caseCategory: [CaseCategory.BP_CLM_CTG010],
    taskDefKey: {
      BP_CLMPM_ACT001: lazy(() => import('process/PHCLM/ClaimPaymentTrack/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.HK_CLM_CTG001,
    taskDefKey: {
      HK_CLM_ACT001: lazy(() => import('process/HKCLM/DataCapture/Entry')),
      HK_CLM_ACT003: lazy(() => import('process/HKCLM/ManualAssessment/Entry')),
      HK_CLM_ACT004: lazy(() => import('process/HKCLM/ClaimApprove/Entry')),
      HK_CLM_ACT005: lazy(() => import('process/HKCLM/QualityControl/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.HK_CLM_CTG002,
    taskDefKey: {
      HK_CLM_ACT001: lazy(() => import('process/HKCLM/DataCapture/Entry')),
      HK_CLM_ACT003: lazy(() => import('process/HKCLM/ManualAssessment/Entry')),
      HK_CLM_ACT004: lazy(() => import('process/HKCLM/ClaimApprove/Entry')),
      HK_CLM_ACT005: lazy(() => import('process/HKCLM/QualityControl/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.HK_CLM_CTG003,
    taskDefKey: {
      HK_CLM_ACT008: lazy(() => import('process/HKCLM/ManualAssessment/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.HK_CR_CTG001,
    taskDefKey: {
      HK_CR_ACT001: lazy(() => import('process/HKCLM/PMACheque/Entry')),
      HK_CR_ACT002: lazy(() => import('process/HKCLM/PMACheque/Entry')),
      HK_CR_ACT003: lazy(() => import('process/HKCLM/PMACheque/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.HK_CR_CTG002,
    taskDefKey: {
      HK_CR_ACT001: lazy(() => import('process/HKCLM/PMACheque/Entry')),
      HK_CR_ACT002: lazy(() => import('process/HKCLM/PMACheque/Entry')),
      HK_CR_ACT003: lazy(() => import('process/HKCLM/PMACheque/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.TH_UD_CTG01,
    taskDefKey: {
      TH_UD_ACT001: lazy(() => import('./Thailand/ProcessOfUD/UnknownDocument/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.BP_IE_CTG001,
    taskDefKey: {
      BP_IE_ACT001: lazy(() => import('./ExceptionalHandling/Entry')),
      BP_IE_ACT002: lazy(() => import('./ExceptionalHandling/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.HK_DC_CTG001,
    taskDefKey: {
      [TaskDefKey.HK_DC_ACT001]: lazy(() =>
        import('../../../DocumentManage/src/DocumentScanning/Entry')
      ),
    },
  },
  {
    caseCategory: [CaseCategory.BP_DC_CTG002, CaseCategory.BP_DC_CTG003],
    taskDefKey: {
      [TaskDefKey.BP_DC_ACT001]: lazy(() =>
        import('../../../DocumentManage/src/BatchDocumentScanning/Entry')
      ),
    },
  },
  {
    caseCategory: CaseCategory.TH_IHA_CTG01,
    taskDefKey: {
      TH_IHA_ACT001: lazy(() => import('./Thailand/ProcessOfIHA/HospitalBatchAssessment/Entry')),
    },
  },
  // Leave Managment
  {
    caseCategory: CaseCategory.BP_AL_CTG001,
    taskDefKey: {
      BP_AL_ACT001: lazy(() => import('../../../LeaveManagement/Entry')),
      BP_AL_ACT002: lazy(() => import('../../../LeaveManagement/Entry')),
    },
  },
  // NB
  {
    caseCategory: CaseCategory.BP_NB_CTG001,
    taskDefKey: {
      BP_NB_ACT002: lazy(() => import('process/NB/CustomerIdentification/Entry')),
      BP_NB_ACT004: lazy(() => import('process/NewBusiness/ManualUnderwriting/Entry')),
      BP_NB_ACT006: lazy(() => import('process/NB/PremiumSettlement/Entry')),
      BP_NB_ACT008: lazy(() => import('process/NB/QualityControl/Entry')),
    },
  },
  // Test NB
  {
    caseCategory: `${CaseCategory.BP_NB_CTG001}_process`,
    taskDefKey: {
      BP_NB_ACT002: lazy(() => import('process/NB/CustomerIdentification/Entry')),
      BP_NB_ACT004: lazy(() => import('process/NB/ManualUnderwriting/Entry')),
      BP_NB_ACT006: lazy(() => import('process/NB/PremiumSettlement/Entry')),
      BP_NB_ACT008: lazy(() => import('process/NB/QualityControl/Entry')),
    },
  },
  {
    caseCategory: `${CaseCategory.BP_NB_CTG005}_process`,
    taskDefKey: {
      BP_NB_ACT002: lazy(() => import('process/NB/CustomerIdentification/Entry')),
      BP_NB_ACT004: lazy(() => import('process/NB/ManualUnderwriting/Entry')),
      BP_NB_ACT006: lazy(() => import('process/NB/PremiumSettlement/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.BP_NB_CTG005,
    taskDefKey: {
      BP_NB_ACT002: lazy(() => import('process/NB/CustomerIdentification/Entry')),
      BP_NB_ACT004: lazy(() => import('process/NewBusiness/ManualUnderwriting/Entry')),
      BP_NB_ACT006: lazy(() => import('process/NB/PremiumSettlement/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.VN_UW_CTG001,
    taskDefKey: {
      VN_UW_ACT001: lazy(() => import('process/NewBusiness/ManualUnderwriting/Entry')),
    },
  },

  {
    caseCategory: CaseCategory.BP_NB_CTG002,
    taskDefKey: {
      BP_NB_ACT002: lazy(() => import('process/NB/CustomerIdentification/Entry')),
      BP_NB_ACT004: lazy(() => import('process/NewBusiness/ManualUnderwriting/Entry')),
      BP_NB_ACT006: lazy(() => import('process/NB/PremiumSettlement/Entry')),
      BP_NB_ACT008: lazy(() => import('process/NB/QualityControl/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.BP_NB_CTG003,
    taskDefKey: {
      BP_NB_ACT002: lazy(() => import('process/NB/CustomerIdentification/Entry')),
      BP_NB_ACT004: lazy(() => import('process/NewBusiness/ManualUnderwriting/Entry')),
      BP_NB_ACT006: lazy(() => import('process/NB/PremiumSettlement/Entry')),
      BP_NB_ACT008: lazy(() => import('process/NB/PHQualityControl/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.BP_NB_CTG004,
    taskDefKey: {
      BP_NB_ACT009: lazy(() => import('process/NB/NBProposalCreation/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.BP_AP_CTG02,
    taskDefKey: {
      BP_AP_ACT003: lazy(() => import('process/NewBusiness/ManualUnderwriting/Entry')),
      BP_AP_ACT005: lazy(() => import('process/NB/PremiumSettlement/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.BP_AP_CTG03,
    taskDefKey: {
      BP_AP_ACT003: lazy(() => import('process/NewBusiness/ManualUnderwriting/Entry')),
      BP_AP_ACT005: lazy(() => import('process/NB/PremiumSettlement/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.BP_DD_CTG001,
    taskDefKey: {
      BP_DD_ACT001: lazy(() => import('process/Document/Entry')),
      BP_DD_ACT002: lazy(() => import('process/Document/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.KH_ME_CTG001,
    taskDefKey: {
      KH_ME_ACT001: lazy(() => import('process/MedicalRequestFlow')),
    },
  },
  {
    caseCategory: 'ctg_sharing',
    taskDefKey: {
      sharing_act01: lazy(() => import('process/CTGSharing/index')),
      sharing_act02: lazy(() => import('process/CTGSharing/index')),
    },
  },
  {
    caseCategory: CaseCategory.BP_FEC_CTG001,
    taskDefKey: {
      BP_FEC_ACT001: lazy(() => import('process/NB/FECApproval/Entry')),
      BP_FEC_ACT002: lazy(() => import('process/NB/FECApproval/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.NB_UW_CTG001,
    taskDefKey: {
      NB_UW_ACT001: lazy(() => import('process/NewBusiness/ManualUnderwriting/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.NB_UW_CTG005,
    taskDefKey: {
      NB_UW_ACT002: lazy(() => import('process/NewBusiness/ManualUnderwriting/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.NB_UW_CTG006,
    taskDefKey: {
      NB_UW_ACT001: lazy(() => import('process/NewBusiness/ManualUnderwriting/Entry')),
    },
  },

  {
    caseCategory: CaseCategory.BP_UW_CTG003,
    taskDefKey: {
      NB_UW_ACT001: lazy(() => import('process/NewBusiness/ManualUnderwriting/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.BP_CLM_CTG009,
    taskDefKey: {
      BP_CLM_AS_ACT001: lazy(() => import('process/HKCLM/ClaimRegister/Entry')),
      BP_CLM_AS_ACT002: lazy(() => import('process/HKCLM/ClaimRegister/Entry')),
      BP_CLM_AS_ACT003: lazy(() => import('process/HKCLM/ClaimDecision/Entry')),
      BP_CLM_AS_ACT004: lazy(() => import('process/HKCLM/ClaimDecision/Entry')),
    },
  },
  {
    caseCategory: CaseCategory.BP_PAPER_CTG003,
    taskDefKey: {
      BP_PAPER_ACT001: lazy(() => import('process/NB/NBDataCollector/Entry')),
    },
  },
];
