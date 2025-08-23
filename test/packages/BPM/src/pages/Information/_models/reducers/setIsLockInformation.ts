import lodash from 'lodash';
import { produce } from 'immer';

/**
 * 设置information content 是否锁
 * @param state
 * @param {Boolean} action.payload.lockInformationData
 */
export default (state: any, action: Object) => {
  const lockInformationData = lodash.get(action, 'payload.lockInformationData', false);
  const nextState = produce(state, (draftState: any) => {
    draftState.lockInformationData = lockInformationData;
  });
  return {
    ...nextState,
  };
};
