import { produce } from 'immer';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { formUtils } from 'basic/components/Form';
const updateErrorCount = (state) => {
  const nextState = produce(state, (draftState) => {
    const { claimProcessData, claimEntities } = draftState;
    const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
    const errors = formUtils.getErrorArray(denormalizedData);
    draftState.errorCount = errors.length;
  });
  return { ...nextState };
};

export default updateErrorCount;
