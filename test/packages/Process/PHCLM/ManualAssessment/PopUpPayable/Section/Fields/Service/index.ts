import ServicePayableAmount, {
  localFieldConfig as ServicePayableAmountConfig,
} from './PayableAmount';
import ServicePayableDays, { localFieldConfig as ServicePayableDaysConfig } from './PayableDays';
import BoosterPayableAmount, {
  localFieldConfig as BoosterPayableAmountConfig,
} from './BoosterAmount';
import BoosterPayableDays, { localFieldConfig as BoosterPayableDaysConfig } from './BoosterDays';
import InvoiceNo, { localFieldConfig as InvoiceNoConfig } from './InvoiceNo';
import ServiceItem, { localFieldConfig as ServiceItemConfig } from './ServiceItem';
import Chooise, { localFieldConfig as ChooiseConfig } from './Chooise';
import TreatmentNo, { localFieldConfig as TreatmentNoConfig } from './TreatmentNo';
import PolicyYear, { localFieldConfig as PolicyYearConfig } from './PolicyYear';

export const localFieldConfigs = [
  ServicePayableAmountConfig,
  ServicePayableDaysConfig,
  BoosterPayableAmountConfig,
  BoosterPayableDaysConfig,
  InvoiceNoConfig,
  ServiceItemConfig,
  ChooiseConfig,
  TreatmentNoConfig,
  PolicyYearConfig,
];

export default {
  Chooise,
  PolicyYear,
  ServicePayableAmount,
  ServicePayableDays,
  BoosterPayableAmount,
  BoosterPayableDays,
  InvoiceNo,
  ServiceItem,
  TreatmentNo,
};
