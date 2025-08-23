import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { ewsData } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.ewsData = ewsData;
  });
  return { ...nextState };
};
