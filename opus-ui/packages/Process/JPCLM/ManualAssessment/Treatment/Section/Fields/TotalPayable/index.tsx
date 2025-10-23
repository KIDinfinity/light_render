import PayableAmount, { localFieldConfig as PayableAmountConfig } from './PayableAmount';
import PayableDays, { localFieldConfig as PayableDaysConfig } from './PayableDays';

import SystemPayableDays, {
  localFieldConfig as SystemPayableDaysConfig,
} from './SystemPayableDays';
import OutpatientDate, { localFieldConfig as OutpatientDateConfig } from './OutpatientDate';
import Remark, { localFieldConfig as RemarkConfig } from './Remark';

import HospitalizationSequentialNo, {
  localFieldConfig as HospitalizationSequentialNoConfig,
} from './HospitalizationSequentialNo';
import ChangeHospitalizationSequentialNo, {
  localFieldConfig as ChangeHospitalizationSequentialNoConfig,
} from './ChangeHospitalizationSequentialNo';
import ChangeObjectAmount, {
  localFieldConfig as ChangeObjectAmountConfig,
} from './ChangeObjectAmount';

import SystemCalculationAmount, {
  localFieldConfig as SystemCalculationAmountConfig,
} from './SystemCalculationAmount';
import SystemCalculationDays, {
  localFieldConfig as SystemCalculationDaysConfig,
} from './SystemCalculationDays';
import adjustOriginPayableDays, {
  localFieldConfig as adjustOriginPayableDaysConfig,
} from './AdjustOriginPayableDays';
import AdjustOriginPayableAmount, {
  localFieldConfig as AdjustOriginPayableAmountConfig,
} from './AdjustOriginPayableAmount';


export const localFieldConfigs = [
  PayableAmountConfig,
  PayableDaysConfig,
  OutpatientDateConfig,
  RemarkConfig,
  HospitalizationSequentialNoConfig,
  SystemPayableDaysConfig,
  ChangeHospitalizationSequentialNoConfig,
  ChangeObjectAmountConfig,
  SystemCalculationAmountConfig,
  SystemCalculationDaysConfig,
  adjustOriginPayableDaysConfig,
  AdjustOriginPayableAmountConfig,
];

export default {
  PayableAmount,
  PayableDays,
  OutpatientDate,
  Remark,

  HospitalizationSequentialNo,
  SystemPayableDays,
  ChangeHospitalizationSequentialNo,
  ChangeObjectAmount,
  SystemCalculationAmount,
  SystemCalculationDays,
  adjustOriginPayableDays,
  AdjustOriginPayableAmount,
};
