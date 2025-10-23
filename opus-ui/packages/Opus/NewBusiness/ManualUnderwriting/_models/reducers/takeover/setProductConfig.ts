import { produce } from 'immer';

type TAction = {
  type: any;
  payload: {
    productConfig: any[];
    policyNo: string;
  };
};

export default (state: any, action: TAction) => {
  const { productConfig, policyNo } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.takeOver.productConfig[policyNo] = productConfig;
  });
  return { ...nextState };
};
