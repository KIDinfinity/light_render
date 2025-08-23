enum EGlobalAuthCode {
  VIEW = 'authEnvoyVisible',
  EDIT = 'authEnvoyEditable',
  SEND = 'authEnvoySendable',
}

enum ESelfAuthCode {
  VIEW = 'envoyView',
  EDIT = 'envoyEdit',
  SEND = 'envoySend',
}

enum ETaskStatus {
  TODO = 'todo',
  PENDING = 'pending',
  COMPLETED = 'completed',
  ERROR = 'error',
}

enum EPendingType {
  PENDING = 'Pending',
  SUPPORT = 'Support',
  NOTICE = 'Notice',
}

enum EPageType {
  MESSAGE = 'message',
  REMARK = 'remark',
  Subcase = 'subcase',
}

enum EAllowActions {
  SAVE = 'Save',
  WAIVE = 'Waive',
  Resolve = 'Resolve',
}

enum EReasonStatus {
  DRAFT = 'Draft',
  ACTIVE = 'Active',
  WAIVED = 'Waived',
  RESOLVE = 'Resolve',
  RESOLVED = 'Resolved',
  OVERDUE = 'Overdue',
}

enum EReminderStatus {
  DRAFT = 'Draft',
  WAIT = 'Wait',
  SENT = 'Sent',
  MISFIRE = 'Misfire',
  CANCELLED = 'Cancelled',
}

enum EOptReasonStatus {
  WAIVE = 'Waive',
  RESOLVE = 'Resolve',
  OVERDUE = 'Overdue',
}

enum ETplCtnSeries {
  CONTENT = 'content',
  ISALL = 'isAllEditable',
}

enum EChannelType {
  SMS = 'sms',
  LETTER = 'letter',
  EMAIL = 'email',
  REMARK = 'remark',
}

enum EGroupCode {
  P_PND_032 = 'P_PND_032',
  P_PND_033 = 'P_PND_033',
}

enum EUserInfoType {
  ROLE = 'role',
  TO = 'to',
}

enum EDataType {
  REASON = 'reason',
  REMINDER = 'reminder',
  RETRY = 'retry',
}

enum EMemoCode {
  FREE = 'FREE',
}

enum EModuleName {
  PendingMemo = 'pendingMemo',
  envoyTo = 'envoyTo',
  channelContent = 'channelContent',
}

enum EMemoStatus {
  NOTRECEIVED = 'Not Received',
  RECEIVED = 'Received',
  WAIVED = 'Waived',
}

enum ESubmitStatus {
  NotSubmitted = 'N',
  Submitted = 'Y',
}

enum EnvoyLifeCircleStatus {
  loadedAndEnvoyClosed = 'loadedAndEnvoyClosed',
  loadedAndEnvoyOpen = 'loadedAndEnvoyOpen',
  loadingEnvoyClosed = 'loadingEnvoyClosed',
  loadingEnvoyOpen = 'loadingEnvoyOpen',
}

enum EnvoyRequestType {
  pending = 'pending',
  nonPending = 'non-pending',
}

enum EnovyPreviewMode {
  MUSTPREVIEW = 'must_preview',
  CANPREVIEW = 'can_preview',
  NOPREVIEW = 'no_preview',
  NULL = 'null',
}

enum EnvoyButtonType {
  SEND = 'SEND',
  PREVIEW = 'PREVIEW',
  SAVE = 'Save',
  WAIVE = 'Waive',
}

enum EnovyEnclosureType {
  PDF = 'PDF',
}

enum EnovyEnclosureImgTypes {
  PNG = 'PNG',
  JPG = 'JPG',
  GIF = 'GIF',
  SVG = 'SVG',
  ICO = 'ICO',
  BMP = 'BMP',
}

enum EnovyRetryTypes {
  FAIL = 'fail',
  RETRY = 'retry',
  WAIT = 'waiting',
  SUCCESS = 'success',
  HOLD = 'onHold',
}

export {
  EnvoyRequestType,
  EGlobalAuthCode,
  ESelfAuthCode,
  ETaskStatus,
  EPendingType,
  EPageType,
  EAllowActions,
  EReasonStatus,
  EReminderStatus,
  EOptReasonStatus,
  ETplCtnSeries,
  EChannelType,
  EGroupCode,
  EUserInfoType,
  EDataType,
  EMemoCode,
  EModuleName,
  EMemoStatus,
  EnvoyLifeCircleStatus,
  EnovyPreviewMode,
  EnvoyButtonType,
  EnovyEnclosureType,
  EnovyEnclosureImgTypes,
  ESubmitStatus,
  EnovyRetryTypes,
};
