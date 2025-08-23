import { produce } from 'immer';

export default (state: any, action: any) => {
  const { allReasonConfigList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.allReasonConfigList = allReasonConfigList;
  });
  return { ...nextState };
};
