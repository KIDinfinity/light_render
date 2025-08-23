export enum BenefitCategory {
  life = 'L',
  cashless = 'C',
  aipa = 'A',
  reimbursement = 'R',
  S = 'S',
  T = 'T',
  Crisis = 'CI',
  LumpSum = 'CL',
  CIC = 'CIC',
  MajorIllnessCashBenefit = 'MIC', // for JP
}

export enum BenefitSubCategory {
  OP = 'OP',
  ANNT = 'ANNT',
}

export enum TreatmentType {
  InPatient = 'IP',
  OutPatient = 'OP',
}

export enum SwitchEnum {
  YES = 'Y',
  NO = 'N',
}

export enum ClaimDecision {
  deny = 'D',
  pending = 'P',
  approve = 'A',
  exGratia = 'E',
  NA = 'N',
}
export enum eClaimDecisionPH {
  Deny = 'Deny',
  Approve = 'Approve',
}
export enum DiagnosisType {
  Primary = 'P',
  Secondary = 'S',
}
export default BenefitCategory;
