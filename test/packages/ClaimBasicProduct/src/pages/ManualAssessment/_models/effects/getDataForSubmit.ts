import lodash from 'lodash';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { formUtils } from 'basic/components/Form';

export default function* (_, { select }) {
  const { claimProcessData, claimEntities } = yield select(
    (state) => state.bpOfClaimAssessmentController
  );
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));

  if (lodash.isEmpty(claimData)) {
    return false;
  }
  return claimData;
}
