import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { isShowPopUpDecision } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.isShowPopUpDecision = isShowPopUpDecision;
  });
  return { ...nextState };
};
