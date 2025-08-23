import { produce } from 'immer';

const saveRefreshStatus = (state: any, action: any) => {
  const { checkNumberRefresh } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.claimProcessData.checkNumberRefresh = checkNumberRefresh;
  });

  return { ...nextState };
};

export default saveRefreshStatus;
