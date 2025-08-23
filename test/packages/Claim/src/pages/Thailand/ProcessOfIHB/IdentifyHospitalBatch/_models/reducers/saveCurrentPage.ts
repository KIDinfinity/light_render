import { produce } from 'immer';

const saveCurrentPage = (state: any, action: any) => {
  const { currentPage } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.currentPage = currentPage;
  });

  return { ...nextState };
};

export default saveCurrentPage;
