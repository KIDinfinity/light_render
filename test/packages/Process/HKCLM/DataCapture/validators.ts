import { collectSectionErrors, VLD_000551 } from 'claimBasicProduct/pages/validators';
import { VLD_000185 } from 'claim/pages/validators/sectionValidators';
// 统计section错误
const sectionErrors = (claimProcessData: any, submited: boolean, claimEntities: any) => {
  if (!claimProcessData || !submited) {
    return [];
  }

  const errors: string[] = [
    ...collectSectionErrors(claimProcessData, submited),
    ...VLD_000551(claimProcessData, submited),
    ...VLD_000185(claimEntities),
  ];
  return errors;
};

export { sectionErrors };
