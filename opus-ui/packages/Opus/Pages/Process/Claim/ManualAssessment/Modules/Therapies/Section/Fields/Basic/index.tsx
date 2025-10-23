import KjCode, { localFieldConfig as KjCodeConfig } from './KjCode';
import OperationDate, { localFieldConfig as OperationDateConfig } from './OperationDate';
import ProcedureCode, { localFieldConfig as ProcedureCodeConfig } from './ProcedureCode';
import ProcedureDescription, {
  localFieldConfig as ProcedureDescriptionConfig,
} from './ProcedureDescription';
import TherapiesTypeAdd, { localFieldConfig as TherapiesTypeAddConfig } from './TherapiesTypeIAdd';
import ProcedureName, { localFieldConfig as ProcedureNameConfig } from './ProcedureName';
import SurgicalSite, { localFieldConfig as SurgicalSiteConfig } from './SurgicalSite';
import TherapyType, { localFieldConfig as TherapyTypeConfig } from './TherapyType';
import HighReimbPct, { localFieldConfig as HighReimbPctConfig } from './HighReimbPct';
import BornMarrowFlg, { localFieldConfig as BornMarrowFlgConfig } from './BornMarrowFlg';
import TransplantationSurgeryFlag, {
  localFieldConfig as TransplantationSurgeryFlagConfig,
} from './TransplantationSurgeryFlag';
import SurgeryInstructionDate, {
  localFieldConfig as SurgeryInstructionDateConfig,
} from './SurgeryInstructionDate';

export const localFieldConfigs = [
  KjCodeConfig,
  OperationDateConfig,
  ProcedureCodeConfig,
  ProcedureDescriptionConfig,
  TherapiesTypeAddConfig,
  ProcedureNameConfig,
  SurgeryInstructionDateConfig,
  SurgicalSiteConfig,
  TherapyTypeConfig,
  HighReimbPctConfig,
  BornMarrowFlgConfig,
  TransplantationSurgeryFlagConfig,
];

export default {
  KjCode,
  OperationDate,
  ProcedureCode,
  ProcedureDescription,
  TherapiesTypeAdd,
  ProcedureName,
  SurgicalSite,
  TherapyType,
  SurgeryInstructionDate,
  HighReimbPct,
  BornMarrowFlg,
  TransplantationSurgeryFlag,
};
