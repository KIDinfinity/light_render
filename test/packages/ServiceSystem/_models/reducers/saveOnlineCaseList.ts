import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { onlineCaseList } = payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.onlineCaseList = onlineCaseList;
  });

  return { ...nextState };
};
