import { produce } from 'immer';
import lodash from 'lodash';

const saveBasicInforData = (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData = {
      ...draftState.claimProcessData,
      basicInforData: lodash.get(payload, 'basicInforData', {}),
    };
  });
  return { ...nextState };
};

export default saveBasicInforData;
