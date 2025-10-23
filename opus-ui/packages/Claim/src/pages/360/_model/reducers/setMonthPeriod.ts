import loadsh from 'lodash';
import { produce } from 'immer';

export default (state: any, action: any) => {
  const monthPeriod = loadsh.get(action, 'payload.monthPeriod');
  const nextState = produce(state, (draftState: any) => {
    loadsh.set(draftState, 'monthPeriod', monthPeriod);
  });
  return { ...nextState };
};
