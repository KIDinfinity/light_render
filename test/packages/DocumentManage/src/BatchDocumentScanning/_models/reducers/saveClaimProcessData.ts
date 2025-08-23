import { produce }  from 'immer';
import forEach from 'lodash/forEach';

const saveClaimProcessData = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { claimProcessData, type } = action.payload;
    const claimProcess = [];
    forEach(claimProcessData, (data) => {
      claimProcess.push({
        ...data,
      });
    });
    draftState.type = type;
    draftState.claimProcessData = [...claimProcess];
  });
  return { ...nextState };
};

export default saveClaimProcessData;
