import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const allCategoryTypeCode = lodash.get(action, 'payload.allCategoryTypeCode');
  const nextState = produce(state, (draftState: any) => {
    draftState.allCategoryTypeCode = allCategoryTypeCode;
  });
  return {
    ...nextState,
  };
};
