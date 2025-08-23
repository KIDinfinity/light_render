export enum TaskStatus {
  Completed = 'completed',
  Todo = 'todo',
  Pending = 'pending',
  Cancel = 'cancel',
}

export enum eGender {
  Female = 'F',
  Male = 'M',
  Company = 'C',
}

export enum JPCLMCTG01_TASKDEFKEY {
  ManualAssessment = 'JP_CLM_ACT004',
}

export enum eCorporateOrIndividual {
  person = '01',
  corporation = '02',
}

export enum eTypeOfPayment {
  lump = '01',
  bailouts = '02',
}

export enum eTransferAccount {
  transfer = '01',
  assign = '02',
}

export enum ePaymentMethod {
  bank = '01',
  post = '02',
  premium = '03',
}

export enum ePayablesType {
  premium = '01',
  capitalsum = '02',
}

export enum eRequireOpenUDMessage {
  JP_CLM_ACT004 = 'JP_CLM_ACT004',
  JP_CLM_ACT005 = 'JP_CLM_ACT005',
  JP_CLM_ACT006 = 'JP_CLM_ACT006',
}

export default {};
