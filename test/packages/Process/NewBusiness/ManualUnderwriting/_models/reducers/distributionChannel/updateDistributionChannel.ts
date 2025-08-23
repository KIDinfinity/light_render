import { produce } from 'immer';
import AgentType from 'process/NewBusiness/Enum/AgentType';
import updateAgentSplitPercentChannel from 'process/NewBusiness/ManualUnderwriting/_utils/updateAgentSplitPercentChannel';

type TAction = {
  type: any;
  payload: {
    changedFields: any;
  };
};

export default (state: any, action: TAction) => {
  const { changedFields } = action.payload;
  const id = changedFields?.id;
  const agentType = changedFields?.agentType;
  const agentChannelCode = changedFields?.agentChannelCode;
  const old = state.modalData.distributionChannel.distributionChannelList[id];
  if (id) {
    const nextState = produce(state, (draftState: any) => {
      draftState.modalData.distributionChannel.distributionChannelList[id] = {
        ...old,
        ...changedFields,
      };
      if (agentType === AgentType.Primary) {
        draftState.modalData.distributionChannel.agentChannelCode = agentChannelCode;
      }
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
  }

  return { ...state };
};
