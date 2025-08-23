import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { sigleVersionData, version, originEWSData } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, `ewsDataMap.${version}`, sigleVersionData);
    lodash.set(draftState, `ewsOriginDataMap.${version}`, originEWSData);
  });
  return { ...nextState };
};
