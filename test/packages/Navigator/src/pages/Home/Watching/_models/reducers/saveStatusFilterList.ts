import { produce } from 'immer';

export default (state: any, action: any) => {
  const {
    payload: { statusFilterList },
  } = action;

  const nextState = produce(state, (draftState: any) => {
    draftState.statusFilterList = statusFilterList;
  });

  return { ...nextState };
};
