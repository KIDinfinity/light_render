import { validateTime } from '@/utils/validationsUtil';

// 終了日 should not be earlier than the begining date of ICU.
export const VLD_000057 = (treatmentItem, earlyDateName, lateDateName, finalChangedFields) =>
  validateTime(treatmentItem, earlyDateName, lateDateName, finalChangedFields, 'ERR_000084');
