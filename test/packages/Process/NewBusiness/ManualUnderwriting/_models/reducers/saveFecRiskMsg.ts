import { produce } from 'immer';

export default (state: any, action: any) => {
  const { fecRiskMsg } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.fecRiskMsg = fecRiskMsg;
  });
  return { ...nextState };
};
