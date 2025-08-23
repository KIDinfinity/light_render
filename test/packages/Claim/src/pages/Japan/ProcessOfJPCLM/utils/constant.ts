export enum PolicyCategory {
  'BPO' = 'bpo',
  'CR' = 'registration',
  'SFDC' = 'SFDC',
  'OTHER' = 'other',
}

export enum PhoneNoType {
  Default = 'default',
  Special = 'special',
}

export enum PolicySetupStatus {
  Standard = 'standard',
  NoImplement = 'not_implement_product',
  NoBelong = 'not_belong_to_insured',
}

export enum ExpectDecisionOperation {
  Exclude = 'E',
  Include = 'I',
}

export enum BeneficiaryPayableType {
  Insurance = '01',
  Payments = '02',
}

export enum PolicyType {
  Individual = 'I',
  Group = 'G',
}

export enum ProcedureType {
  Radioactive = '01',
  Advanced = '02',
}

export interface ExpectDecision {
  assessObject?: string;
  assessObjectId?: string;
  assessorOverrideAmount?: number;
  assessorOverrideDays?: number;
  assessorOverrideDeductible?: number;
  assessorOverrideMultiple?: number;
  benefitItemCode?: string;
  benefitTypeCode?: string;
  claimDecision?: string;
  claimNo: string;
  decisionId?: string;
  incidentBenefitId?: string;
  incidentId: string;
  operation: string;
  policyCategory: string;
  policyId: string;
  policySetupStatus: string;
  productCode?: string;
  treatmentId?: string;
}
