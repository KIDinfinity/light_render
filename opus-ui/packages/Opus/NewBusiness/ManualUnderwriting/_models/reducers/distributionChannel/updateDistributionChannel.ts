import { produce } from 'immer';
import lodash from 'lodash';
import AgentType from 'opus/NewBusiness/Enum/AgentType';
import updateAgentSplitPercentChannel from 'opus/NewBusiness/ManualUnderwriting/_utils/updateAgentSplitPercentChannel';

type TAction = {
  type: any;
  payload: {
    changedFields: any;
  };
};

export default (state: any, action: TAction) => {
  const { distributionChannel } = action.payload;
  const changedFields = distributionChannel;
  const id = changedFields?.id;
  const agentType = changedFields?.agentType;
  const agentChannelCode = changedFields?.agentChannelCode;
  const old = state.modalData.distributionChannel.distributionChannelList[id];
  const otherAgentIds = Object.values(
    state?.modalData?.distributionChannel?.distributionChannelList
  )
    .filter((agent: any) => {
      return agent?.id && !agent?.isLast && agent?.commissionSplitPercent?.errors?.length > 0;
    })
    .map((agent: any) => agent.id);
  const hasCommissionSplitPercentErrors = changedFields?.commissionSplitPercent?.errors?.length > 0;
  if (id) {
    const nextState = produce(state, (draftState: any) => {
      draftState.modalData.distributionChannel.distributionChannelList[id] = {
        ...old,
        ...changedFields,
      };
      if (!hasCommissionSplitPercentErrors) {
        otherAgentIds.forEach((key) => {
          const errorLogKey = `${key}_updateDistributionChannel_commissionSplitPercent`;
          delete draftState.errorLog.errors[errorLogKey];
          draftState.errorLog.errorCount = lodash.size(draftState.errorLog.errors);
          delete draftState.modalData.distributionChannel.distributionChannelList[key]
            .commissionSplitPercent.errors;
        });
      }
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
