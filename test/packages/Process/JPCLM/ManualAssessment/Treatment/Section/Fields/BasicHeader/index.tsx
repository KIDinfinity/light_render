import DateOfConsultation, {
  localFieldConfig as DateOfConsultationConfig,
} from './DateOfConsultation';
import TreatmentType, { localFieldConfig as TreatmentTypeConfig } from './TreatmentType';
import HospitalizationInstructionDate, {
  localFieldConfig as HospitalizationInstructionDateConfig,
} from './HospitalizationInstructionDate';
import HospitalizationFlg, {
  localFieldConfig as HospitalizationFlgConfig,
} from './HospitalizationFlg';
import HospitalizationSequentialNo, {
  fieldConfig as HospitalizationSequentialNoConfig,
} from './HospitalizationSequentialNo';

export const localFieldConfigs = [
  DateOfConsultationConfig,
  TreatmentTypeConfig,
  HospitalizationInstructionDateConfig,
  HospitalizationFlgConfig,
  HospitalizationSequentialNoConfig,
];

export default {
  DateOfConsultation,
  TreatmentType,
  HospitalizationInstructionDate,
  HospitalizationFlg,
  HospitalizationSequentialNo,
};
