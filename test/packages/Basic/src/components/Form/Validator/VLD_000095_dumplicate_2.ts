import { validateTime } from '@/utils/validationsUtil';

// To date should not be earlier than from date
export const VLD_000095_dumplicate_2 = (
  treatmentItem: any,
  earlyDateName: any,
  lateDateName: any,
  finalChangedFields: any
) => validateTime(treatmentItem, earlyDateName, lateDateName, finalChangedFields, 'ERR_000110');
