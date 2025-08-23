import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import updateAgentSplitPercent from 'process/NB/ManualUnderwriting/utils/updateAgentSplitPercent';

export default (state: any, action: any) => {
  const { agentType } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const newItemId = uuidv4();
    const agentList = lodash.get(draftState, 'businessData.agentList') || [];
    const agentData = lodash.get(draftState, 'agentData');
    agentList.push({
      id: newItemId,
      agentType: agentType,
    });
    agentData.push({
      id: newItemId,
      agentType: agentType,
    });
    lodash.set(draftState, `businessData.agentList`, updateAgentSplitPercent(agentList));
    lodash.set(draftState, `agentData`, updateAgentSplitPercent(agentData));
  });
  return {
    ...nextState,
  };
};
