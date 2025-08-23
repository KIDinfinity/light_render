import { produce } from 'immer';

const saveCurrentPage = (state: any, { payload }: any) => {
  const { position } = payload;

  return produce(state, (draft: any) => {
    const draftState = draft;
    const { appealPage } = draft;
    draftState.appealPage = position === 1 ? appealPage + 1 : appealPage - 1;
  });
};

export default saveCurrentPage;
