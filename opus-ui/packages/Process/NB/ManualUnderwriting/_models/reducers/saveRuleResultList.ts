import { produce } from 'immer';

export default (state: any, action: any) => {
  const { ruleResultList } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.ruleResultList = ruleResultList;
  });
  return { ...nextState };
};
