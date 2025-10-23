import { VLD_000551 } from 'claimBasicProduct/pages/validators';
import { VLD_000185 } from 'claim/pages/validators/sectionValidators';
import { VLD_000051 } from '@/utils/validations';
// 统计section错误
const sectionErrors = (claimProcessData: any, submited: boolean, claimEntities: any) => {
  if (!claimProcessData || !submited) {
    return [];
  }

  const errors: string[] = [
    ...VLD_000551(claimProcessData, submited),
    ...VLD_000185(claimEntities),
  ];

  if (VLD_000051(claimProcessData.incidentList, submited)) {
    if (!errors.includes("SPECIAL ERROR: [incident] shouldn't be empty")) {
      errors.push("SPECIAL ERROR: [incident] shouldn't be empty");
    }
  }

  return errors;
};

export { sectionErrors };
