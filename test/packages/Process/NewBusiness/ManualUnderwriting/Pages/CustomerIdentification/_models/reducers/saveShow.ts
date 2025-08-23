import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { show } = payload || {};
  const nextState = produce(state, (draftState: any) => {
    draftState.show = show;
  });
  return {
    ...nextState,
  };
};
