import { VLD_000006, VLD_000185 } from 'claim/pages/validators/sectionValidators';

// 统计section错误
const collectSectionErrors = (claimProcessData: any, submited: boolean, claimEntities: any) => {
  if (!claimProcessData || !submited || !claimEntities) {
    return [];
  }

  const errors: string[] = [
    ...VLD_000006(claimEntities),
    ...VLD_000006(claimEntities, 'mainBenefit'),
    ...VLD_000185(claimEntities),
  ];
  return errors;
};

export { collectSectionErrors };
