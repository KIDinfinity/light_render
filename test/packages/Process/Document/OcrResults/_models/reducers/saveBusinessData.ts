import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { businessData } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.businessData = businessData;
  });
  return { ...nextState };
};
