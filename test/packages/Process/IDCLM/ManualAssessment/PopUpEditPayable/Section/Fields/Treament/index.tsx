import DateOfAdmission, { localFieldConfig as DateOfAdmissionConfig } from './DateOfAdmission';
import DateOfDischarge, { localFieldConfig as DateOfDischargeConfig } from './DateOfDischarge';
import DateOfConsultation, {
  localFieldConfig as DateOfConsultationConfig,
} from './DateOfConsultation';

export const localFieldConfigs = [
  DateOfAdmissionConfig,
  DateOfDischargeConfig,
  DateOfConsultationConfig,
];

export default {
  DateOfConsultation,
  DateOfAdmission,
  DateOfDischarge,
};
