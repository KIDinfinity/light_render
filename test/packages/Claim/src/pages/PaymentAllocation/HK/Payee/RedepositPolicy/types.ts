import type { IFormRegistProps } from '@/components/FormRegistComponent';
import type { RedepositPolicyModal } from 'claim/pages/PaymentAllocation/_dto/Models/RedepositPolicyModal';
import type { PayeeModal } from '../../../_dto/Models';

export interface IDepositPolicy extends IFormRegistProps {
  redepositPolicyItem: RedepositPolicyModal; // todo
  payeeItem: PayeeModal;
  taskNotEditable?: boolean;
  withData?: any;
  validating?: boolean;
  canRedeposit?: boolean;
  ownerPolicyMap?: Record<
    string,
    {
      policyId: string;
      policyCurrency: string;
    }[]
  >;
  beneficiaryList: any[];
}
