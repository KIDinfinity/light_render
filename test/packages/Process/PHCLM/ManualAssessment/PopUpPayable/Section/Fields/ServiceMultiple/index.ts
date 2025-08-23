import ServicePayableAmount, {
  localFieldConfig as ServicePayableAmountConfig,
} from './PayableAmount';
import ServicePayableDays, { localFieldConfig as ServicePayableDaysConfig } from './PayableDays';
import BoosterPayableAmount, {
  localFieldConfig as BoosterPayableAmountConfig,
} from './BoosterAmount';
import BoosterPayableDays, { localFieldConfig as BoosterPayableDaysConfig } from './BoosterDays';
import InvoiceNo, { localFieldConfig as InvoiceNoConfig } from './InvoiceNo';
import Chooise, { localFieldConfig as ChooiseConfig } from './Chooise';
import ServiceItem, { localFieldConfig as ServiceItemConfig } from './ServiceItem';

export const localFieldConfigs = [
  ServicePayableAmountConfig,
  ServicePayableDaysConfig,
  BoosterPayableAmountConfig,
  BoosterPayableDaysConfig,
  InvoiceNoConfig,
  ChooiseConfig,
  ServiceItemConfig,
];

export default {
  Chooise,
  ServicePayableAmount,
  ServicePayableDays,
  BoosterPayableAmount,
  BoosterPayableDays,
  InvoiceNo,
  ServiceItem,
};
