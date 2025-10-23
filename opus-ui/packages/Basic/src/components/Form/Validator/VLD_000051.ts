import { validateEmptyAndSubmited } from '@/utils/validationsUtil';

// Require at least one incident record for each claim case.
export const VLD_000051 = (incidentList: any, submited: any) =>
  validateEmptyAndSubmited(incidentList, submited);
