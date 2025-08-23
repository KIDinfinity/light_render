import { produce } from 'immer';;

type TAction = {
  type: any;
  payload: {
    campaignList: any[];
  };
};

export default (state: any, action: TAction) => {
  const { campaignList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.distributionChannel.campaignList = campaignList;
  });
  return { ...nextState };
};
