import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const changedFields = lodash.get(action, 'payload.changedFields');
  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) === 1 && lodash.has(changedFields, 'hospitalCategory')) {
      lodash.set(
        draftState,
        'businessData.hospitalCategory',
        changedFields?.hospitalCategory?.value
      );
      lodash.set(
        draftState,
        'hospitalCategoryValidateStatus',
        changedFields?.hospitalCategory?.value ? null : 'error'
      );
    }
  });
  return {
    ...nextState,
  };
};
