export enum PayeeType {
  Beneficiaries = 'B',
  Insured = 'I',
  Guardian = 'G',
}

export enum PaymentMethod {
  Bank = '01',
  Cheque = '02',
}

export enum BenefitCategory {
  life = 'L',
  cashless = 'C',
  aipa = 'A',
  reimbursement = 'R',
}

export enum ClaimDecision {
  deny = 'D',
  pending = 'P',
  approve = 'A',
}

/**
 * 用于显示不同AccidentBenefitPayable Section模板
 */
export enum SupportLimitCode {
  SA_PERCENTAGE_PER_WEEK = 'sa_percentage_per_week',
  SA_PERCENTAGE = 'sa_percentage',
  SA_PERCENTAGE_PER_YEAR = 'sa_percentage_per_year',
  AMOUNT_PER_WEEK = 'amount_per_week',
  SA_PERCENTAGE_PER_DISABILITY = 'sa_percentage_per_disability',
}

export enum BenefitLimitCode {
  SA_PERCENTAGE_PER_WEEK = 'sa_percentage_per_week',
  SA_PERCENTAGE = 'sa_percentage',
  SA_PERCENTAGE_PER_YEAR = 'sa_percentage_per_year',
  AMOUNT_PER_WEEK = 'amount_per_week',
  AMOUNT_PER_WEEK_LIMIT = 'amount_per_week_limit',
  WEEK_PER_LIFETIME_LIMIT = 'weeks_per_lifetime_limit',
  YEAR_PER_LIFETIME_LIMIT = 'years_per_lifetime_limit',
  AMOUNT_PER_LIFETIME_LIMIT = 'amount_per_lifetime_limit',
  SA_PERCENTAGE_PER_DISABILITY = 'sa_percentage_per_disability',
  WEEKS_PER_DISABILITY_LIMIT = 'weeks_per_disability_limit',
}

// AccidentBenefitPayableItem中limitCode的取值范围
export const supportLimitCodeList = [
  SupportLimitCode.AMOUNT_PER_WEEK,
  SupportLimitCode.SA_PERCENTAGE,
  SupportLimitCode.SA_PERCENTAGE_PER_WEEK,
  SupportLimitCode.SA_PERCENTAGE_PER_YEAR,
  SupportLimitCode.SA_PERCENTAGE_PER_DISABILITY,
];

export default BenefitCategory;
