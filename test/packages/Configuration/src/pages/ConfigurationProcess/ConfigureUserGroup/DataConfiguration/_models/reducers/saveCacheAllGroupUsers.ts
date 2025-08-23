import { produce } from 'immer';

export default (state: any, action: any) => {
  const { allGroupUsers } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line
    draftState.allGroupUsers = allGroupUsers;
  });
  return nextState;
};
