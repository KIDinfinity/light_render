import { produce } from 'immer';

export default (state: any, action: any) => {
  const { typeCode, dicts } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.linkMultipleDicts[typeCode] = dicts;
  });
  return { ...nextState };
};
