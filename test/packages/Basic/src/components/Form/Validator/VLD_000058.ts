import { validateTime2 } from '@/utils/validationsUtil';

// Operation day must be during hospitalization.
export const VLD_000058 = (
  treatmentItem: any,
  procedureItem: any,
  earlyDateName: any,
  middleDateName: any,
  lateDateName: any,
  finalChangedFields: any
) =>
  validateTime2(
    treatmentItem,
    procedureItem,
    earlyDateName,
    middleDateName,
    lateDateName,
    finalChangedFields,
    'ERR_000086'
  );
