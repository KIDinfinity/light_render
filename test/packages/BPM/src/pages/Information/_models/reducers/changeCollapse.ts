import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const collapseActiveKey = lodash.get(action, 'payload.collapseActiveKey', '');
  const nextState = produce(state, (draftState: any) => {
    draftState.collapseActiveKey = collapseActiveKey;
  });
  return {
    ...nextState,
  };
};
