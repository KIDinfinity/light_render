import DateOfConsultation, { fieldConfig as DateOfConsultationConfig } from './DateOfConsultation';
import TreatmentType, { fieldConfig as TreatmentTypeConfig } from './TreatmentType';
import HospitalizationInstructionDate, {
  fieldConfig as HospitalizationInstructionDateConfig,
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
