import { produce } from 'immer';

const saveSkipOds = (state: any, { payload }: any) => {
  const { skipOds } = payload;

  return produce(state, (draftState: any) => {
    const draft = draftState;

    draft.claimProcessData.skipOds = skipOds;
  });
};

export default saveSkipOds;
