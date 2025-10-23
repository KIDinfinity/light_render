import {
  VLD_000006,
  VLD_000051,
  VLD_000390,
  VLD_000389,
} from 'claim/pages/validators/sectionValidators';

// 统计section错误
const collectSectionErrors = (claimProcessData: any, submited: boolean, claimEntities: any) => {
  if (!claimProcessData || !submited || !claimEntities) {
    return [];
  }

  const errors: string[] = [
    ...VLD_000006(claimEntities),
    ...VLD_000051(claimEntities),
    ...VLD_000390(claimEntities),
    ...VLD_000389(claimEntities),
  ];
  return errors;
};

export { collectSectionErrors };
