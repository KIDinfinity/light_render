import { validateTime } from '@/utils/validationsUtil';

// 開始日 should not be earlier than admission date.
export const VLD_000056 = (treatmentItem, earlyDateName, lateDateName, finalChangedFields) =>
  validateTime(treatmentItem, earlyDateName, lateDateName, finalChangedFields, 'ERR_000082');
