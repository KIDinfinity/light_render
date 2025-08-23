import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { isAddProductExclusion } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.isAddProductExclusion = isAddProductExclusion;
  });
  return { ...nextState };
};
