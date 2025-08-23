/* eslint-disable global-require */
/**
 * controller  //  namespace
 * getDataForSave //  save 保存snapshot获取数据的effect - 在actionConfig.ts里的save方法
 * onFieldChange // 表单onfieldchange统一入口 - 推荐找Insured.tsx，约定是saveFormData
 * saveClaim // 保存理赔数据的reducer - 在入口componentDidMount里
 * clearClaim // 清除理赔数据的reducer - 在入口componentWillUnmount里
 * dataMap // 理赔数据结构带国际化
 */

export default [
  /**
   * 基础产品
   */
  // DataCapture
  {
    namespace: 'bpOfDataCaptureController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('claimBasicProduct/pages/DataCapture/title.config').default,
  },
  // ManualAssessment
  {
    namespace: 'bpOfClaimAssessmentController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('claimBasicProduct/pages/ManualAssessment/title.config').default,
  },
  /**
   * 泰国产品
   */
  // Identify Hospital Billing - HBOfAssessment
  {
    namespace: 'hbOfClaimAssessmentController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('claim/pages/Thailand/ProcessOfHB/HBOfAssessment/title.config').default,
  },

  /**
   * 日本产品
   */
  {
    namespace: 'JPCLMOfQualityController',
    getDataForSave: 'getClaimProcessData',
    onFieldChange: 'saveFormDataLatest',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/auditLogDataMap')
      .default,
  },
  {
    namespace: 'JPCLMOfClaimAssessmentController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('claim/pages/Japan/ProcessOfJPCLM/JPCLMOfAssessment/title.config').default,
  },
  {
    namespace: 'JPCLMOfClaimRegistrationController',
    getDataForSave: 'prepareClaimData',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('claim/pages/Japan/ProcessOfJPCLM/JPCLMOfClaimRegistration/title.config')
      .default,
  },
  // process/JPCLM
  {
    namespace: 'JPCLMOfDataCapture',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'businessDataCreate',
    clearClaim: 'clean',
    dataMap: require('process/JPCLM/DataCapture/auditLogDataMap').default,
  },
  {
    namespace: 'JPCLMOfClaimAssessment',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('process/JPCLM/ManualAssessment/auditLogDataMap').default,
  },
  /**
   * 菲律宾产品
   */
  {
    namespace: 'batchCreateProcess',
    getDataForSave: 'getDataForSave',
    onFieldChange: 'saveFormData',
    saveClaim: 'setMainData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('phowb/pages/BatchCreateProcess/title.config').default,
  },
  {
    namespace: 'phowbDataCaptureController',
    getDataForSave: 'getDataForSave',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('phowb/pages/POS/title.config').default,
  },
  {
    namespace: 'PHCLMOfDataCaptureController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('claim/pages/Philippines/ProcessOfPHICLM/DataCapture/title.config').default,
  },
  {
    namespace: 'PHCLMOfClaimAssessmentController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('claim/pages/Philippines/ProcessOfPHICLM/ManualAssessment/title.config')
      .default,
  },
  {
    namespace: 'PHCLMOfAppealCaseController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('claim/pages/Philippines/ProcessOfPHICLM/ClaimAppeal/title.config').default,
  },

  /**
   * 泰国
   */
  // AP
  {
    namespace: 'apOfClaimAssessmentController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('claim/pages/Thailand/ProcessOfAP/APOfAssessment/title.config').default,
  },
  {
    namespace: 'apOfClaimCaseController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('claim/pages/Thailand/ProcessOfAP/APOfQualityControl/title.config').default,
  },
  // DA
  {
    namespace: 'daOfClaimAssessmentController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('claim/pages/Thailand/ProcessOfDA/DAOfAssessment/title.config').default,
  },
  {
    namespace: 'daOfClaimCaseController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('claim/pages/Thailand/ProcessOfDA/DAOfQualityControl/title.config').default,
  },
  /**
   * 香港
   */
  // DataCapture
  {
    namespace: 'HKCLMOfDataCaptureController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('process/HKCLM/DataCapture/title.config').default,
  },
  // ManualAssessment
  {
    namespace: 'HKCLMOfClaimAssessmentController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('process/HKCLM/ManualAssessment/title.config').default,
  },

  /**
   * 菲律宾
   */
  // DataCapture
  {
    namespace: 'PHCLMOfCTG008DataCaptureController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('process/PHCLM/DataCapture/title.config').default,
  },
  // ManualAssessment
  {
    namespace: 'PHCLMOfCTG008AssessmentController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('process/PHCLM/ManualAssessment/title.config').default,
  },
  {
    namespace: 'MYCLMOfCTG008AssessmentController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('process/MYCLM/ManualAssessment/title.config').default,
  },
  {
    namespace: 'PHCLMOfClaimPaymentTrackController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('process/PHCLM/ClaimPaymentTrack/title.config').default,
  },
  {
    namespace: 'MYCLMOfClaimPaymentTrackController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('process/PHCLM/ClaimPaymentTrack/title.config').default,
  },

  /**
   * 泰国 TH 2.0
   */
  // DataCapture
  {
    namespace: 'THCLMOfDataCaptureController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('process/THCLM/DataCapture/title.config').default,
  },
  // ManualAssessment
  {
    namespace: 'THCLMOfClaimAssessmentController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('process/THCLM/ManualAssessment/title.config').default,
  },

  /**
   * 印尼 ID
   */
  // DataCapture
  {
    namespace: 'IDCLMOfDataCaptureController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('process/IDCLM/DataCapture/title.config').default,
  },
  // ManualAssessment
  {
    namespace: 'IDCLMOfClaimAssessmentController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('process/IDCLM/ManualAssessment/title.config').default,
  },

  // exceptional handling
  {
    namespace: 'exceptionalHandlingController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('claim/pages/ExceptionalHandling/title.config').default,
  },
  {
    namespace: 'manualUnderwriting',
    getDataForSave: 'getDataForSave',
    saveClaim: 'saveBizData',
    onFieldChange: 'saveFormData',
    clearClaim: 'clearBizData',
    dataMap: require('process/NB/ManualUnderwriting/audit.config').default,
  },
  {
    namespace: 'newBusinessManualUnderwriting',
    getDataForSave: 'getDataForAuditLog',
    saveClaim: 'saveProcessData',
    onFieldChange: 'saveFormData',
    clearClaim: 'resetBizData',
    dataMap: require('process/NewBusiness/ManualUnderwriting/audit.config').default,
  },
  {
    namespace: 'customerIdentification',
    getDataForSave: 'getDataForSave',
    saveClaim: 'saveClaimProcessData',
    onFieldChange: 'saveFormData',
    clearClaim: 'clearClaim',
  },
  {
    namespace: 'premiumSettlement',
    saveClaim: 'saveBizData',
    getDataForSave: 'getDataForSave',
    onFieldChange: 'saveFormData',
  },
  {
    namespace: 'medicalRequestFlow',
    saveClaim: 'saveBizData',
    getDataForSave: 'getDataForSave',
    onFieldChange: 'saveFormData',
  },

  // document scanning //
  {
    namespace: 'documentScanningController',
    getDataForSave: 'getDataForSave',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('documentManage/DocumentScanning/title.config').default,
  },
  /**
   * TH
   */
  // FEC Approval
  {
    namespace: 'FECApproval',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveBizData',
    clearClaim: 'clearBizData',
    dataMap: require('process/NB/FECApproval/title.config').default,
  },
  // POS Decision
  {
    namespace: 'GeneralPOSController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('process/GeneralPOS/BaseProduct/audit.config').default,
    // onlySection: true,
  },
  // POS Minor Transaction
  {
    namespace: 'GeneralPOSPHNotCFTController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('process/GeneralPOS/PHNotCFT/audit.config').default,
  },
  // POS REQUEST SUBMISSION
  {
    namespace: 'PHBatchCreateProcessController',
    getDataForSave: 'getDataForSubmit',
    onFieldChange: 'saveFormData',
    saveClaim: 'saveClaimProcessData',
    clearClaim: 'clearClaimProcessData',
    dataMap: require('process/GeneralPOS/PHBatchCreateProcess/audit.config').default,
  },
];
