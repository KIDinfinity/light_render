import CountOfSurgery, { localFieldConfig as CountOfSurgeryConfig } from "./CountOfSurgery";
import ProcedureDateEntry, { localFieldConfig as ProcedureDateEntryConfig } from "./ProcedureDateEntry";
import ProcedureDateOCR, { localFieldConfig as ProcedureDateOCRConfig } from "./ProcedureDateOCR";
import ProcedureNameEntry, { localFieldConfig as ProcedureNameEntryConfig } from "./ProcedureNameEntry";
import ProcedureNameOCR, { localFieldConfig as ProcedureNameOCRConfig } from "./ProcedureNameOCR";

export const localFieldConfigs = [
  CountOfSurgeryConfig,
  ProcedureDateEntryConfig,
  ProcedureDateOCRConfig,
  ProcedureNameEntryConfig,
  ProcedureNameOCRConfig,
]

export default {
  CountOfSurgery,
  ProcedureDateEntry,
  ProcedureDateOCR,
  ProcedureNameEntry,
  ProcedureNameOCR,
};
