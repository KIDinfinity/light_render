import PaymentStatus, { localFieldConfig as PaymentStatusConfig } from './PaymentStatus';

import PayoutDate, { localFieldConfig as PayoutDateConfig } from './PayoutDate';

import PaymentNo, { localFieldConfig as PaymentNoConfig } from './PaymentNo';

export const localFieldConfigs = [PaymentStatusConfig, PayoutDateConfig, PaymentNoConfig];

export default { PaymentStatus, PayoutDate, PaymentNo };
