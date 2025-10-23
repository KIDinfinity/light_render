import { produce } from 'immer';
import lodash from 'lodash';
import { calcAge } from '@/utils/utils';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData = {
      ...draftState.claimProcessData,
      ...changedFields,
    };
    if (lodash.size(changedFields) === 1) {
      lodash.set(
        draftState,
        'claimProcessData.insured.age',
        calcAge(
          formUtils.queryValue(draftState.claimProcessData?.insured?.dateOfBirth),
          formUtils.queryValue(changedFields?.submissionDate)
        )
      );
    }
  });

  return { ...nextState };
};
