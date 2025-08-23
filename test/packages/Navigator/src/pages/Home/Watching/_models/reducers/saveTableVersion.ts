import { produce } from 'immer';

export default (state: any, action: any) => {
  const {
    payload: { homeTableVersion },
  } = action;

  const nextState = produce(state, (draftState: any) => {
    draftState.homeTableVersion = homeTableVersion || 'default';
  });

  return { ...nextState };
};
