import { produce }  from 'immer';

const saveUIConfig = (state: any, action: any) => {
  const { priceByfundCode } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.priceByfundCode = priceByfundCode;
  });

  return { ...nextState };
};

export default saveUIConfig;
