import lodash from 'lodash';
import {
  VLD_000006,
  VLD_000028,
  VLD_000030,
  VLD_000031,
  VLD_000185,
} from 'claim/pages/validators/sectionValidators';
import { isPreArrangement, isReimbursement } from 'claim/pages/Thailand/flowConfig';

// 统计section错误
const collectSectionErrors = (claimProcessData: any, submited: boolean, claimEntities: any) => {
  if (!claimProcessData || !submited || !claimEntities) {
    return [];
  }
  const caseCategory = lodash.get(claimProcessData, 'caseCategory');

  const errors: string[] = [
    ...VLD_000006(claimEntities),
    ...VLD_000006(claimEntities, 'mainBenefit'),
    ...VLD_000028(claimEntities),
    ...VLD_000031(claimEntities),
    ...VLD_000185(claimEntities),
  ];
  if (!isPreArrangement(caseCategory) && !isReimbursement(caseCategory)) {
    lodash.concat(errors, VLD_000030(claimEntities));
  }

  return errors;
};

export { collectSectionErrors };
