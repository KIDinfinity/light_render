import DateOfAdmission, { localFieldConfig as DateOfAdmissionConfig } from './DateOfAdmission';
import DateOfDischarge, { localFieldConfig as DateOfDischargeConfig } from './DateOfDischarge';
import MedicalProvider, { localFieldConfig as MedicalProvidertConfig } from './MedicalProvider';
import No, { localFieldConfig as NoConfig } from './No';
import InpatientDays, { localFieldConfig as InpatientDaysConfig } from './InpatientDays';

export const localFieldConfigs = [
  DateOfAdmissionConfig,
  DateOfDischargeConfig,
  MedicalProvidertConfig,
  NoConfig,
  InpatientDaysConfig,
];

export default {
  DateOfAdmission,
  DateOfDischarge,
  MedicalProvider,
  No,
  InpatientDays,
};
