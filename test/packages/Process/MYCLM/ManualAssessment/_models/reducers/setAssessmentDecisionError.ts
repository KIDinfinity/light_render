import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const setAssessmentDecisionError = (state: any, action: any) => {
  const { isAssessmentDecisionNAError } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const draft = draftState;
    const newClaimEntities = draftState.claimProcessData;

    if (isAssessmentDecisionNAError) {
      newClaimEntities.claimDecision.assessmentDecision = {
        ...newClaimEntities.claimDecision.assessmentDecision,
        value: formUtils.queryValue(newClaimEntities.claimDecision.assessmentDecision),
        errors: [
          {
            message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000484' }),
            field: 'assessmentDecision',
          },
        ],
      };
    }
    draft.claimProcessData = newClaimEntities;
  });

  return { ...nextState };
};

export default setAssessmentDecisionError;
