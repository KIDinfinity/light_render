import { produce } from 'immer';

type TAction = {
  type: any;
  payload: {
    changedFields: any;
  };
};

export default (state: any, action: TAction) => {
  const { changedFields } = action.payload;
  const takeOverFlag = changedFields?.takeOverFlag;
  if (!takeOverFlag) return state;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.takeOver.takeOverFlag = takeOverFlag;
  });
  return { ...nextState };
};
