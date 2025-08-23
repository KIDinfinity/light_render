import { produce }  from 'immer';

export default (state: any, { payload }: any) => {
  const { businessData } = payload || {};
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData = businessData;
  });
  return { ...nextState };
};
