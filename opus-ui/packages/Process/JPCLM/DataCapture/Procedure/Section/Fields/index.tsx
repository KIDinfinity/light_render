import KjCode, { localFieldConfig as KjCodeConfig } from './KjCode';
import OperationDate, { localFieldConfig as OperationDateConfig } from './OperationDate';
import ProcedureCode, { localFieldConfig as ProcedureCodeConfig } from './ProcedureCode';
import ProcedureName, { localFieldConfig as ProcedureNameConfig } from './ProcedureName';
import TherapyType, { localFieldConfig as TherapyTypeConfig } from './TherapyType';
import SurgicalSite, { localFieldConfig as SurgicalSiteConfig } from './SurgicalSite';
import HighReimbPct, { localFieldConfig as HighReimbPctConfig } from './HighReimbPct';
import BornMarrowFlg, { localFieldConfig as BornMarrowFlgConfig } from './BornMarrowFlg';
import TransplantationSurgeryFlg, {
  localFieldConfig as TransplantationSurgeryFlgConfig,
} from './TransplantationSurgeryFlg';
import ProcedureDescription, {
  localFieldConfig as ProcedureDescriptionConfig,
} from './ProcedureDescription';
import SurgeryInstructionDate, {
  localFieldConfig as SurgeryInstructionDateConfig,
} from './SurgeryInstructionDate';

export const localFieldConfigs = [
  KjCodeConfig,
  OperationDateConfig,
  ProcedureCodeConfig,
  ProcedureNameConfig,
  ProcedureDescriptionConfig,
  SurgeryInstructionDateConfig,
  TherapyTypeConfig,
  SurgicalSiteConfig,
  HighReimbPctConfig,
  TransplantationSurgeryFlgConfig,
  BornMarrowFlgConfig,
];

export default {
  KjCode,
  OperationDate,
  ProcedureCode,
  ProcedureName,
  ProcedureDescription,
  SurgeryInstructionDate,
  TherapyType,
  SurgicalSite,
  HighReimbPct,
  TransplantationSurgeryFlg,
  BornMarrowFlg,
};
