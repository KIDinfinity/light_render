export enum eTraceStatus {
  start = '0',
  end = '1',
}

export enum eOperation {
  load = 'load',
  unload = 'unload',
  changeStatus = 'changeStatus',
  inquiry = 'inquiry'
}

export enum ePageName {
  caseManagement = 'venus-claim-caseManagement',
  dataCapture = 'venus-claim-dataCapture',
  qualityControl = 'venus-claim-qualityControl',
  manualAssessment = 'venus-claim-manualAssessment',
  assessmentReview = 'venus-claim-assessmentReview',
  approval = 'venus-claim-approval',
  paymentApproval = 'venus-claim-paymentApproval',
  appeal = 'venus-claim-appeal',
  documentDispatch = 'venus-claim-documentDispatch',
  claimInquiry = 'venus-claim-claimInquiry',
  cancellationApproval = 'venus-claim-cancellationApproval',
  pendingForCTA = 'venus-claim-pendingForCTA',
  correspondence = 'venus-claim-correspondence',
  underWriting = 'venus-claim-underWriting',
  inForce = 'venus-claim-inForce',
  requestSubmission = 'venus-claim-requestSubmission',
  autoInForce = 'venus-claim-autoInForce',
  paymentTrack = 'venus-claim-paymentTrack',
}

export const ePageService = {
  [ePageName.caseManagement]: 'log4cm',
  [ePageName.claimInquiry]: 'simpleLog',
  default: 'log4claim',
};

export enum eTaskDefToPageName {
  'dataCapture' = ePageName.dataCapture,
  'JP_CLM_ACT001' = ePageName.dataCapture,
  'PH_CLM_ACT001' = ePageName.dataCapture,
  'PH_POS_ACT001' = ePageName.dataCapture,

  'qualityControl' = ePageName.qualityControl,
  'JP_CLM_ACT002' = ePageName.qualityControl,
  'CP_ACT001' = ePageName.qualityControl,
  'PH_CLM_ACT004' = ePageName.qualityControl,
  'PH_POS_ACT004' = ePageName.qualityControl,

  'manualAssessment' = ePageName.manualAssessment,
  'JP_CLM_ACT004' = ePageName.manualAssessment,
  'JP_CA_ACT002' = ePageName.manualAssessment,
  'CP_ACT003' = ePageName.manualAssessment,
  'BP_AP_ACT001' = ePageName.manualAssessment,
  'PH_CLM_ACT002' = ePageName.manualAssessment,

  'JP_CLM_ACT005' = ePageName.assessmentReview,

  'JP_CLM_ACT006' = ePageName.approval,
  'JP_CA_ACT004' = ePageName.approval,
  'claimApproval' = ePageName.approval,
  'BP_AP_ACT002' = ePageName.approval,
  'CP_ACT004' = ePageName.approval,
  'PH_CLM_ACT003' = ePageName.approval,
  'PH_POS_ACT003' = ePageName.approval,

  'JP_CLM_ACT007' = ePageName.paymentApproval,

  'JP_CLM_ACT008' = ePageName.cancellationApproval,

  'JP_DD_ACT001' = ePageName.documentDispatch,

  'PH_CLM_ACT005' = ePageName.pendingForCTA,
  'PH_CLM_ACT006' = ePageName.correspondence,
  'PH_CLMUW_ACT001' = ePageName.underWriting,
  'PH_POS_ACT002' = ePageName.underWriting,
  'PH_POS_ACT005' = ePageName.autoInForce,
  'PH_POS_ACT006' = ePageName.inForce,
  'PH_POS_ACT007' = ePageName.requestSubmission,
  'PH_POS_ACT010' = ePageName.paymentTrack,
}

export enum eEventName {
  'caseInquiry' = 'Case Inquiry',
  'taskInquiry' = 'Task Inquiry',
  'claimHistory' = 'Claim History',
  'smartCircle' = 'Smart Circle',
  'nbHistory' = 'Nb History',
  'posHistory' = 'POS History',
  'caseManagement' = 'Case Management',
  'policyNotice'= 'Policy Notice',
  'correspondence' = 'Correspondence'
}

export enum eEventOperation {
  search = 'Search',
  viewDetail = 'ViewDetail',
  preView = 'Preview',
  print = 'Print'
}
