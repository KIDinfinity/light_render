import { produce }  from 'immer';
import lodash from 'lodash';
import { calcAge } from '@/utils/utils';
import { relationshipWithInsuredForHK } from 'claim/enum';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const { changedFields, bpmSubmissionDate } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (bpmSubmissionDate) {
      draftState.claimProcessData = {
        ...draftState.claimProcessData,
        submissionDate: bpmSubmissionDate,
      };
    } else {
      draftState.claimProcessData = {
        ...draftState.claimProcessData,
        ...changedFields,
      };
      lodash.set(
        draftState,
        'claimProcessData.insured.age',
        calcAge(
          formUtils.queryValue(draftState.claimProcessData?.insured?.dateOfBirth),
          changedFields?.submissionDate?.value
        )
      );
      if (
        draftState.claimProcessData.claimant.relationshipWithInsured ===
        relationshipWithInsuredForHK.self
      ) {
        lodash.set(
          draftState,
          'claimProcessData.claimant.age',
          calcAge(
            formUtils.queryValue(draftState.claimProcessData?.claimant?.dateOfBirth),
            changedFields?.submissionDate?.value
          )
        );
      }
    }
  });

  return { ...nextState };
};
