import lodash from 'lodash';
import actions from './actions';

export default (state: any, action: any) => {
  const actionHandler = actions[action?.type];
  if (lodash.isFunction(actionHandler)) {
    return actionHandler(state, action);
  }
};
