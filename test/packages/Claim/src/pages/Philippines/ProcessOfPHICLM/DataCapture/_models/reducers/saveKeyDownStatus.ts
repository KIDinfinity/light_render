import { produce } from 'immer';

const saveKeyDownStatus = (state: any, action: any) => {
  const { keyDownStatus } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.keyDownStatus = keyDownStatus;
  });

  return { ...nextState };
};

export default saveKeyDownStatus;
