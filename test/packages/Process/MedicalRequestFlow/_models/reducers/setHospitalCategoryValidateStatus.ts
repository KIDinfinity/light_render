import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const hospitalCategoryValidateStatus = lodash.get(
    action,
    'payload.hospitalCategoryValidateStatus'
  );
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'hospitalCategoryValidateStatus', hospitalCategoryValidateStatus);
  });
  return {
    ...nextState,
  };
};
