import { produce } from 'immer';

export default (state: any, action: any) => {
  const {
    payload: { filterState },
  } = action;

  const nextState = produce(state, (draftState: any) => {
    draftState.filterState = filterState;
  });

  return { ...nextState };
};
