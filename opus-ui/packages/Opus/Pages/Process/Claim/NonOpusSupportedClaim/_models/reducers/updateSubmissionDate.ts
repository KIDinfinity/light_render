import { produce } from 'immer';
import lodash from 'lodash';
import { calcAge } from '@/utils/utils';
import { formUtils } from 'basic/components/Form';
import { relationshipWithInsuredForHK } from 'claim/enum';

export default (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.businessData = {
      ...draftState.businessData,
      ...changedFields,
    };

    if (lodash.size(changedFields) === 1) {
      lodash.set(
        draftState,
        'businessData.insured.age',
        calcAge(
          formUtils.queryValue(draftState.businessData?.insured?.dateOfBirth),
          formUtils.queryValue(changedFields?.submissionDate)
        )
      );

      lodash.set(
        draftState,
        'businessData.claimant.age',
        calcAge(
          formUtils.queryValue(draftState.businessData?.claimant?.dateOfBirth),
          formUtils.queryValue(changedFields?.submissionDate)
        )
      );
    }
  });

  return { ...nextState };
};
