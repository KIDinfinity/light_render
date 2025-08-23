import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const cfgRegionalDefaultValueList = lodash.get(action, 'payload.cfgRegionalDefaultValueList', []);
  const nextState = produce(state, (dratState: any) => {
    lodash.set(dratState, 'cfgRegionalDefaultValueList', cfgRegionalDefaultValueList);
  });
  return {
    ...nextState,
  };
};
