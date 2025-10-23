import { produce } from 'immer';

import InitState from '../../state';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.taskData = { ...InitState.taskData, filterChoice: draftState.taskData.filterChoice };
  });
  return { ...nextState };
};
