import { Active } from '../machines/modeButtonService';
import { produce } from 'immer';

export default (state: any, action: any) => {
  const {
    payload: { enterActive },
  } = action;

  const nextState = produce(state, (draftState: any) => {
    draftState.enterActive = enterActive === Active.Active;
  });

  return { ...nextState };
};
