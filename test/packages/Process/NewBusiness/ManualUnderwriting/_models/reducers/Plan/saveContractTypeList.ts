import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.contractTypeList = payload.contractTypeList;
  });
  return {
    ...nextState,
  };
};
