import lodash from 'lodash';

import { shallowEqual } from 'react-redux';

export default (state: any, action: any) => {
  const pageAtomConfig = lodash.get(action, 'payload.pageAtomConfig');
  if(!shallowEqual(state.pageAtomConfig, pageAtomConfig))
    state.pageAtomConfig = pageAtomConfig

  return state;
};
