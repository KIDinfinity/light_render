import { validateTime } from '@/utils/validationsUtil';

// 退院日 Shouldn't be earlier than Date of Admission
export const VLD_000018 = (
  treatmentItem: any,
  earlyDateName: any,
  lateDateName: any,
  finalChangedFields: any
) => validateTime(treatmentItem, earlyDateName, lateDateName, finalChangedFields, 'ERR_000035');
