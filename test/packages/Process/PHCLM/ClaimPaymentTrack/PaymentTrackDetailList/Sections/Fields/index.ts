import PayeeType, { localFieldConfig as PayeeTypeConfig } from './PayeeType';
import PaymentMethod, { localFieldConfig as PaymentMethodConfig } from './PaymentMethod';
import PaymentAmount, { localFieldConfig as PaymentAmountConfig } from './PaymentAmount';
import CheckNo, { localFieldConfig as CheckNoConfig } from './CheckNo';
import CheckDate, { localFieldConfig as CheckDateConfig } from './CheckDate';
import PaidOut, { localFieldConfig as PaidOutConfig } from './PaidOut';
import AdvancedPayoutAmount, {
  localFieldConfig as AdvancedPayoutAmountConfig,
} from './AdvancedPayoutAmount';
import OutstandingPayoutAmount, {
  localFieldConfig as OutstandingPayoutAmountConfig,
} from './OutstandingPayoutAmount';

export const localFieldConfigs = [
  PayeeTypeConfig,
  PaymentMethodConfig,
  PaymentAmountConfig,
  CheckNoConfig,
  CheckDateConfig,
  PaidOutConfig,
  AdvancedPayoutAmountConfig,
  OutstandingPayoutAmountConfig,
];

export default {
  PayeeType,
  PaymentMethod,
  PaymentAmount,
  CheckNo,
  CheckDate,
  PaidOut,
  AdvancedPayoutAmount,
  OutstandingPayoutAmount,
};
