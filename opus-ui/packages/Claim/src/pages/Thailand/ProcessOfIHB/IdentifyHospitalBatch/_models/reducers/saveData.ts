import { produce } from 'immer';
import lodash from 'lodash';

const saveData = (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData = {
      ...draftState.claimProcessData,
      ...lodash.cloneDeep(payload),
    };
  });
  return { ...nextState };
};

export default saveData;
