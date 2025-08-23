import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { ropListMap } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.ropListMap = ropListMap;
  });
  return { ...nextState };
};
