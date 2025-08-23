import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.downInfo = {
      ...draftState.downInfo,
      ...payload,
    };
  });

  return { ...nextState };
};
