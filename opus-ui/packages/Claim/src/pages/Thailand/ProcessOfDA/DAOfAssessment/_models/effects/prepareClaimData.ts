import lodash from 'lodash';
import updateClaimEntities from 'claim/pages/Thailand/ProcessOfDA/DAOfAssessment/_models/functions/updateClaimEntities';
import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from '@/utils/claimUtils';

export default function* (_, { select }) {
  const { claimProcessData, claimEntities } = yield select((state) => ({
    ...lodash.pick(state.daOfClaimAssessmentController, ['claimEntities', 'claimProcessData']),
  }));
  const denormalizedData = denormalizeClaimData(
    claimProcessData,
    updateClaimEntities(claimEntities)
  );
  const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  return claimData;
}
