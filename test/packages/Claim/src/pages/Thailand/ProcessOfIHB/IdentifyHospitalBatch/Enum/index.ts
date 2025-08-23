export enum Status {
  Inprogress = 'Inprogress',
  Scanned = 'Scanned',
  Error = 'Error',
}

export enum MainBenefitType {
  OPD = 'O',
  IPD = 'I',
}
export enum InvoiceType {
  OPD = 'OPD',
  IPD = 'IPD',
  GEB = 'GEB',
}

export enum DiagnosisType {
  Primary = 'P',
  Secondary = 'S',
}

export enum ClaimType {
  OPD = 'OP',
}

export enum ServiceItem {
  OPDHB = 'OPDHB',
}

export enum InvoiceStatus {
  Scanned = 'Scanned',
  NeedIdentify = 'NeedIdentify',
  Approved = 'Approved',
  Assessment = 'Assessment',
  PendingAPS = 'PendingAPS',
  Rejected = 'Rejected',
  Paid = 'Paid',
  Error = 'Error',
  Processing = 'Processing',
  Cancelled = 'Cancelled',
}

export enum SaveType {
  basic = 'basic',
  all = 'all',
}

export enum BOStatus {
  BOPass = 'BOPass',
  BOFail = 'BOFail',
  BOSkip = 'BOSkip',
}

export default {};
