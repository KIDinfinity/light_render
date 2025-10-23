enum Action {
  /** Button */
  Submit = 'Submit',
  qcPass = 'qcPass',
  qcFail = 'qcFail',
  qaPass = 'qaPass',
  qaFail = 'qaFail',
  Reject = 'Reject',
  Pend = 'Pend',
  Resume = 'Resume',
  Withdrawal = 'Withdrawal',
  Split = 'Split',
  Save = 'Save',
  BusinessCheck = 'BusinessCheck',
  Confirm = 'Confirm',
  Reload = 'Reload',
  ConfirmWarningCorp = 'ConfirmWarningCorp',
  DiscardWarningCorp = 'DiscardWarningCorp',
  ConfrimWarningnNewCorp = 'ConfrimWarningnNewCorp',

  /** Save Action */
  SaveAdd = 'Add',
  SaveUpdate = 'Update',
  SaveRemove = 'Remove',
  Verify = 'Verify',

  /** Information */
  AddInformation = 'AddInformation',

  /** Envoy */
  SendPending = 'SendPending',
  SendReminder = 'SendReminder',
  ResolvePending = 'ResolvePending',
  WaivePending = 'WaivePending',
  TurnOnReminder = 'TurnOnReminder',
  TurnOffReminder = 'TurnOffReminder',

  /** Case */
  MarkUrgent = 'MarkUrgent',
  MarkUnUrgent = 'MarkUnUrgent',
  CancelCase = 'CancelCase',
  Reversal = 'Reversal',

  /** Task */
  ReAssessment = 'ReAssessment',
  MarkDocArrived = 'MarkDocArrived',
  Assign = 'Assign',

  /** NTU */
  UpdateNtu = 'UpdateNtu',
  UpdateNtuDate = 'UpdateNtuDate',

  /** NB operationType */
  ReUnderwrite = 'ReUnderwrite',
  Recalculate = 'Recalculate',
  GenerateSI = 'GenerateSI',
  ExtendNTU = 'ExtendNTU',
  Retry = 'Retry',
  Refresh = 'Refresh',
  RefreshCheque = 'RefreshCheque',
  RefreshInitial = 'RefreshInitial',
  // Verify = 'Verify',
  InitialVersionConfirm = 'initialVersionConfrim',
  ClaimRegister = 'claimRegister',
  RetrievePolicyValue = 'retrievePolicyValue',

  /** post add */
  NameScreening = 'NameScreening',
  SplitCase = 'SplitCase',
  Upload = 'Upload',
  UploadDocument = 'UploadDocument',
  EditDocument = 'EditDocument',
  Download = 'downloadWS',
  Generate = 'generateClaimWorksheet',
  ReIndex = 'ReIndex',
  SetVoid = 'SetVoid',
  SetVoided = 'SetVoided',
  Escalate = 'Escalate',
  GetUWMeResult = 'GetUWMeResult',
  AutoAssignment = 'AutoAssignment',
  AutoEscalate = 'AutoEscalate',
  PaymentTransfer = 'PaymentTransfer',
  SystemIssuedPending = 'SystemIssuedPending',
  SystemWaivedPending = 'SystemWaivedPending',
  SystemOverduePending = 'SystemOverduePending',
  SystemAutoWakeUp = 'SystemAutoWakeUp',
  ReOpen = 'ReOpen',
  Appeal = 'Appeal',
}

export default Action;
