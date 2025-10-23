import { validateDuplication } from '@/utils/validationsUtil';

// Duplicate checking of Diagnosis
export const VLD_000009 = (
  finalChangedFields: any,
  claimEntities: any,
  incidentId: any,
  fieldName: any
) =>
  validateDuplication(
    finalChangedFields,
    claimEntities,
    'incidentListMap',
    'diagnosisListMap',
    incidentId,
    fieldName,
    'ERR_000017',
    'diagnosisList'
  );
