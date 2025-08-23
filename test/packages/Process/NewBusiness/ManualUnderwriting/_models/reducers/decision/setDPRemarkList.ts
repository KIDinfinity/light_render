import { produce } from 'immer';

export default (state: any, action: any) => {
  const { dpList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.DPRemarkList = {
      ...draftState.DPRemarkList,
      ...dpList,
    };
  });
  return { ...nextState };
};
