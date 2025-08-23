import lodash from 'lodash';
import { produce } from 'immer';

/**
 * 设置information
 * @param {object} action.payload.addInformation
 */
export default (state: any, action: Object) => {
  const addInformation = lodash.get(action, 'payload.addInformation', {});
  const nextState = produce(state, (draftState: any) => {
    draftState.addInformation = addInformation;
  });
  return {
    ...nextState,
  };
};
