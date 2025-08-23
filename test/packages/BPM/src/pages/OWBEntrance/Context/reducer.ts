import lodash from 'lodash';
import reducers from './reducers';
import { produce } from 'immer';

export default (state: any, action: any) => {
  const reducer = reducers[action.type];

  if (lodash.isFunction(reducer)) {
    return produce(state, (draftState: any) => {
      return reducer(draftState, action);
    });
  }

  return state;
};
