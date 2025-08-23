import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { needRefreshPremium } = payload || {};
  const nextState = produce(state, (draftState: any) => {
    draftState.needRefreshPremium = needRefreshPremium;
  });
  return {
    ...nextState,
  };
};
