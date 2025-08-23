import loadsh from 'lodash';
import { produce } from 'immer';

export default (state: any, action: any) => {
  const key = loadsh.get(action, 'payload.key');
  const nextState = produce(state, (draftState: any) => {
    loadsh.set(draftState, 'c360Tab', key);
  });
  return { ...nextState };
};
