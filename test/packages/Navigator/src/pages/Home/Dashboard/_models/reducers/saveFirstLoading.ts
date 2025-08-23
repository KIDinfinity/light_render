import { produce } from 'immer';

const saveFirstLoading = (state: any, { payload }: any) => {
  const { firstLoading } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.firstLoading = firstLoading;
  });

  return { ...nextState };
};

export default saveFirstLoading;
