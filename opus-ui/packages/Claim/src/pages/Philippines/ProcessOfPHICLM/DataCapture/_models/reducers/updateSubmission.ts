import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { calculateDate } from '../functions';

export default (state: any, action: any) => {
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    if (lodash.has(changedFields, 'submissionDate')) {
      const submissionDate = changedFields.submissionDate.value;
      const dateOfBirth = formUtils.queryValue(draftState.claimProcessData.insured.dateOfBirth);
      const presentAge = calculateDate(submissionDate, dateOfBirth);
      draftState.claimProcessData.insured.presentAge = presentAge;
    }
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData = {
      ...draftState.claimProcessData,
      ...changedFields,
    };
  });
  return { ...nextState };
};
