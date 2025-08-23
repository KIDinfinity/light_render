import { produce } from 'immer';;

import updateAgentSplitPercentChannel from 'process/NewBusiness/ManualUnderwriting/_utils/updateAgentSplitPercentChannel';

type TAction = {
  type: any;
  payload: {
    id: string;
  };
};

export default (state: any, action: TAction) => {
  const { id } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.distributionChannel.distributionChannelList[id] = null;
    delete draftState.modalData.distributionChannel.distributionChannelList[id];

    const changedCommissionSplitPercent = updateAgentSplitPercentChannel(
      draftState.modalData.distributionChannel.distributionChannelList
    );
    changedCommissionSplitPercent.forEach((item) => {
      draftState.modalData.distributionChannel.distributionChannelList[
        item.id
      ].commissionSplitPercent = item.commissionSplitPercent;
    });
  });
  return { ...nextState };
};
