import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { roleDicts } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.roleDicts = roleDicts;
  });
  return { ...nextState };
};
