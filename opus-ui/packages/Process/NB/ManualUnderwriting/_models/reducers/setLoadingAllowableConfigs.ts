import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { loadingAllowableConfigs } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'loadingAllowableConfigs', loadingAllowableConfigs);
  });
  return { ...nextState };
};
