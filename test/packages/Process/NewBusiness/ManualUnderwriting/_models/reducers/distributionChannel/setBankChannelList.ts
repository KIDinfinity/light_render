import { produce } from 'immer';;

type TAction = {
  type: any;
  payload: {
    bankChannelList: any[];
  };
};

export default (state: any, action: TAction) => {
  const { bankChannelList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.distributionChannel.bankChannelList = bankChannelList;
  });
  return { ...nextState };
};
