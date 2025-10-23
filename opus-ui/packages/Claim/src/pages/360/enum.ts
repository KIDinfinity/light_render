export enum TabsKey {
  policy = 'policy',
  coverage = 'coverage',
  claim = 'claim',
  pos = 'pos',
  transaction = 'transaction',
  userComment = 'userComment',
}

export enum ProductGroup {
  I = 'blue',
  G = 'skyBlue',
}

export enum CaseStatus {
  InProgress = 'inProgress',
  Cancel = 'cancel',
  Close = 'close',
  Todo = 'todo',
  Completed = 'completed',
  Pending = 'pending',
}

export enum CaseType {
  RCS = 'mcs',
  KLIP = 'klip',
}

export enum CaseCategory {
  ClaimRegistration = 'JP_CR_CTG01',
  ClaimAssessment = 'JP_CLM_CTG01', // JP_CA_CTG01
}

export enum CoverageType {
  ALL = 'ALL',
  LIFE = 'LIFE',
  TPD = 'TPD',
  ECI = 'ECI',
  CI = 'CI',
}
export enum CoverageStatus {
  ALL = 'ALL',
  Existing = 'Existing',
  Lapsed = 'Lapsed',
  NB = 'NB',
  Pending = 'Pending',
}
export enum SearchListType {
  SAVE = 'CLEAR',
  CLEAR = 'CLEAR',
}
export enum ReferenceModel {
  Customer360 = 'Customer360',
  SummaryPage = 'SummaryPage',
}
