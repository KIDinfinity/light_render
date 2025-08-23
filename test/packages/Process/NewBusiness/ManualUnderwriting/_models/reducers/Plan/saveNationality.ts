import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.nationalityList = payload.nationalityList;
  });
  return {
    ...nextState,
  };
};
