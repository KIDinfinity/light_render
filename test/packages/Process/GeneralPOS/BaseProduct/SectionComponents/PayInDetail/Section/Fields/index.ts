import PaymentRefNo, { localFieldConfig as PaymentRefNoConfig } from './PaymentRefNo';
import PaymentDate, { localFieldConfig as PaymentDateConfig } from './PaymentDate';
import PaymentMethod, { localFieldConfig as PaymentMethodConfig } from './PaymentMethod';
import PaymentAmount, { localFieldConfig as PaymentAmountConfig } from './PaymentAmount';
import PaymentStatus, { localFieldConfig as PaymentStatusConfig } from './PaymentStatus';

export const localFieldConfigs = [
  PaymentDateConfig,
  PaymentRefNoConfig,
  PaymentMethodConfig,
  PaymentStatusConfig,
  PaymentAmountConfig,
];

export default {
  PaymentRefNo,
  PaymentDate,
  PaymentMethod,
  PaymentAmount,
  PaymentStatus,
};
