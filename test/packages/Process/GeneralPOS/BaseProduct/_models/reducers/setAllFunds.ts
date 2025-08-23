import { produce } from 'immer';

export default (state: any, action: any) => {
  const { data } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.fundsDictsMap = data?.reduce((res, i) => {
      res[i.fundCode] = i;
      return res;
    }, {});
  });

  return { ...nextState };
};
