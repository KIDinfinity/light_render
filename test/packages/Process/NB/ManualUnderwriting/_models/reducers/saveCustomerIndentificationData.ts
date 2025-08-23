import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const customerIndentificationData = lodash.get(action, 'payload.customerIndentificationData');
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'customerIndentificationData', customerIndentificationData);
  });
  return {
    ...nextState,
  };
};
