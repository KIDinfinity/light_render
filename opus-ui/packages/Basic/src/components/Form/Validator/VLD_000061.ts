import { validateDuplication } from '@/utils/validationsUtil';

// Duplicate checking of Procedure
export const VLD_000061 = (
  finalChangedFields: any,
  claimEntities: any,
  treatmentId: any,
  fieldName: any
) =>
  validateDuplication(
    finalChangedFields,
    claimEntities,
    'treatmentListMap',
    'procedureListMap',
    treatmentId,
    fieldName,
    'ERR_000091',
    'procedureList'
  );
