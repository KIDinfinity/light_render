import CountOfDPC, { localFieldConfig as CountOfDPCConfig } from './CountOfDPC';
import CountOfHospitalization, {
  localFieldConfig as CountOfHospitalizationConfig,
} from './CountOfHospitalization';
import DateOfAdmissionEntry, {
  localFieldConfig as DateOfAdmissionEntryConfig,
} from './DateOfAdmissionEntry';
import DateOfAdmissionOCR, {
  localFieldConfig as DateOfAdmissionOCRConfig,
} from './DateOfAdmissionOCR';
import DateOfDischargeEntry, {
  localFieldConfig as DateOfDischargeEntryConfig,
} from './DateOfDischargeEntry';
import DateOfDischargeOCR, {
  localFieldConfig as DateOfDischargeOCRConfig,
} from './DateOfDischargeOCR';
import TreatmentStartDate, {
  localFieldConfig as TreatmentStartDateConfig,
} from './TreatmentStartDate';
import TreatmentEndDate, { localFieldConfig as TreatmentEndDateConfig } from './TreatmentEndDate';

export const localFieldConfigs = [
  CountOfDPCConfig,
  CountOfHospitalizationConfig,
  DateOfAdmissionEntryConfig,
  DateOfAdmissionOCRConfig,
  DateOfDischargeEntryConfig,
  DateOfDischargeOCRConfig,
  TreatmentStartDateConfig,
  TreatmentEndDateConfig,
];

export default {
  CountOfDPC,
  CountOfHospitalization,
  DateOfAdmissionEntry,
  DateOfAdmissionOCR,
  DateOfDischargeEntry,
  DateOfDischargeOCR,
  TreatmentStartDate,
  TreatmentEndDate,
};
