import { produce } from 'immer';

type TAction = {
  type: any;
  payload: {
    id: string;
  };
};

export default (state: any, action: TAction) => {
  const { id } = action?.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.fund.fundList[id] = null;
    delete draftState.modalData.fund.fundList?.[id];
  });
  return { ...nextState };
};
