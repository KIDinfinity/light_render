import loadsh from 'lodash';
import { produce } from 'immer';

export default (state: any, action: any) => {
  const config = loadsh.get(action, 'payload.config');
  const nextState = produce(state, (draftState: any) => {
    loadsh.set(draftState, 'tsarBreakDownConifg', config);
  });
  return { ...nextState };
};
