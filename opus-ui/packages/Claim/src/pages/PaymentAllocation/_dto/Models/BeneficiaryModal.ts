export interface BeneficiaryModal {
  address?: string;
  beneficiaryAmount?: number;
  beneficiaryPercentage?: number;
  benefitAmount?: number;
  claimNo?: string;
  clientId?: string;
  dateOfBirth?: null;
  deleted?: number;
  email?: string;
  exchangeRateRecord?: string;
  firstName?: string;
  gender?: string;
  id?: string;
  identityNo?: string;
  identityType?: string;
  modifier?: string;
  organization?: number;
  payTo?: string;
  payToType?: string;
  payableType?: string;
  payeeId?: string;
  payoutAmount?: number;
  payoutCurrency?: string;
  payoutExchangeRate?: number;
  phoneNo?: string;
  policyBenefitId?: string;
  policyCurrency?: string;
  policyNo?: string;
  postCode?: string;
  relationshipWithInsured?: string;
  relationshipWithPayee?: string;
  surname?: string;

  usCitizen?: boolean;
  usCitizenPassportNo?: string;
  usCitizenTaxIdentityNo?: string;
  usCitizenResidenceAddress?: string;

  beneficiaries?: any[];
  manualAdd?: string;
  exchangeRateRecords?: any;
}
