export enum CategoryCode {
  AuditLog = 'auditLog',
  AssessmentNotice = 'assessmentNotice',
  BusinessCheck = 'businessCheck',
  Remark = 'remark',
  Reject = 'reject',
  IneligibilityReason = 'ineligibilityReason',
  PolicyCancellation = 'policyCancellation',
  CreatePendingReason = 'createPendingReason',
  SpecialArticle = 'specialArticle',
  SpApprovalRequest = 'spApprovalRequest',
  MedicalAdvice = 'medicalAdvice',
  ProductCancellation = 'productCancellation',
  AssessmentNote = 'assessmentNote',
  all = 'all',
  MedicalConfirm = 'medicalConfirm',
}

export enum CollapseActiveKey {
  History = 'history',
  AddInformation = 'addInformation',
}

/**
 * information 编辑状态控制字段
 */
export enum ApplicationType {
  Both = 'B',
  ReadOnly = 'R',
}

export enum ActivityStatus {
  Completed = 'completed',
  Todo = 'todo',
  Pending = 'pending',
  Cancelled = 'cancelled',
}
