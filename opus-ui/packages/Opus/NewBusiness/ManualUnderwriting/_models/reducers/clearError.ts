import { produce } from 'immer';
import initState from '../state';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.errorLog = initState.errorLog;
  });
  return { ...nextState };
};
