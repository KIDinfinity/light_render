import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { factoringHousesList } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.factoringHousesList = factoringHousesList;
  });
  return {
    ...nextState,
  };
};
