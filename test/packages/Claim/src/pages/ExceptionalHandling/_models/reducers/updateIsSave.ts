import { produce } from 'immer';

const updateErrorInfo = (state: any, action: any) => {
  const { isSave } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.isSave = isSave
  });

  return { ...nextState };
};

export default updateErrorInfo;
