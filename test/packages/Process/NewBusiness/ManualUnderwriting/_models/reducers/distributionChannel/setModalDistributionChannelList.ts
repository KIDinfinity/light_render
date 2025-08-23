import { produce } from 'immer';;

type TAction = {
  type: any;
  payload: {
    distributionChannelList: any[];
  };
};

export default (state: any, action: TAction) => {
  const { distributionChannelList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const normalizedObj = distributionChannelList.reduce((pre, nxt) => {
      if (nxt?.id) {
        return { ...pre, [nxt.id]: { ...nxt, validAgentNo: true } };
      }
      return { ...pre };
    }, {});
    draftState.modalData.distributionChannel.distributionChannelList = normalizedObj;
  });
  return { ...nextState };
};
