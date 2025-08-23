import { produce } from 'immer';

export default (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.sequence.push({
      ...action.payload,
    });
  });

  return { ...nextState };
};
