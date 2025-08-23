import { produce } from 'immer';;
import { v4 as uuid } from 'uuid';
import AgentType from 'process/NewBusiness/Enum/AgentType';
export default (state: any) => {
  const id = uuid();
  const nextState = produce(state, (draftState: any) => {
    const target = {
      id,
      agentType: AgentType.Commission,
      isLast: true,
    };

    draftState.modalData.distributionChannel.distributionChannelList[id] = target;
  });
  return { ...nextState };
};
