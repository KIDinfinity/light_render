import payableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import Chooise, { localFieldConfig as ChooiseConfig } from './Chooise';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';

export const localFieldConfigs = [PayableAmountConfig, ChooiseConfig, PayableDaysConfig];

export default { payableAmount, Chooise, PayableDays };
