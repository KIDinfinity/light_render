import { produce } from 'immer';;

type TAction = {
  type: any;
  payload: {
    agentChannelCode: string;
  };
};

export default (state: any, action: TAction) => {
  const { agentChannelCode } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.distributionChannel.agentChannelCode = agentChannelCode;
  });
  return { ...nextState };
};
