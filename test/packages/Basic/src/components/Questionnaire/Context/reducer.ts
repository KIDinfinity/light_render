import lodash from 'lodash';
import reducers from './reducers';

export default (state: any, action: any) => {
  const reducer = reducers[action.type];
  if (lodash.isFunction(reducer)) {
    return reducer(state, action);
  }

  return state;
};
