import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: Object) => {
  const columnList = lodash.get(action, 'payload.columnList');
  const nextState = produce(state, (draftState: any) => {
    draftState.columnList = columnList;
  });
  return {
    ...nextState,
  };
};
