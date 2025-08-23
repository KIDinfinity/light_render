enum Action {
  /** Button */
  Submit = 'Submit',
  Reject = 'Reject',
  Pend = 'Pend',
  Resume = 'Resume',
  Withdrawal = 'Withdrawal',
  Split = 'Split',
  Save = 'Save',
  BusinessCheck = 'BusinessCheck',
  Confirm = 'Confirm',
  Reload = 'Reload',
  GenMarkinId = 'GenMarkinId',

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
  GetUWMeResult = 'GetUWMeResult',
  Recalculate = 'Re-Calculate',
  GenerateSI = 'GenerateSI',
  CheckAMLOrCRR = 'CheckAMLOrCRR',
  ExtendNTU = 'ExtendNTU',
  Retry = 'Retry',
  Refresh = 'Refresh',
  RefreshCheque = 'RefreshCheque',
  RefreshInitial = 'RefreshInitial',
  InitialVersionConfirm = 'initialVersionConfrim',
  ClaimRegister = 'claimRegister',
  RetrievePolicyValue = 'retrievePolicyValue',
  BatchAssign = 'BatchAssign',

  /** MustRead Document */
  Acknowledge = 'Acknowledge',
}

export default Action;
