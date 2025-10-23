import type { BeneficiaryModal } from './BeneficiaryModal';

export interface PolicyBenefitModal {
  beneficiaryList?: BeneficiaryModal[];
  benefitAmount?: 0;
  claimNo?: string;
  clientId?: string;
  creator?: string;
  id?: string;
  modifier?: string;
  payTo?: string;
  payToType?: string;
  payablesType?: string;
  paymentMethod?: string;
  policyCurrency?: string;
  policyHolder?: string;
  policyNo?: string;
  policySetupStatus?: string;
  policyType?: string;
  transId?: string;
  manualAdd?: string;
}
