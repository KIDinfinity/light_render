import { denormalizeClaimData } from '@/utils/claimUtils';
import { formUtils } from 'basic/components/Form';

export default function* (_, { select }) {
  const { claimProcessData, claimEntities } = yield select(
    (state) => state.apOfClaimAssessmentController
  );
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  return claimData;
}
