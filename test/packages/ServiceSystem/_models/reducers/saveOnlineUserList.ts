import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { onlineUserList } = payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.onlineUserList = onlineUserList;
  });

  return { ...nextState };
};
