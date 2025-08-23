import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { productCodeList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.productCodeList = productCodeList;
  });
  return { ...nextState };
};
