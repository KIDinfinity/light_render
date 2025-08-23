import { produce }  from 'immer';
import lodash from 'lodash';
import updateAgentSplitPercent from 'process/NB/ManualUnderwriting/utils/updateAgentSplitPercent';

const updateAgentList = (agentList: any, id: string) => {
  const agentFilterList = lodash
    .chain(agentList)
    .filter((item) => item?.id !== id)
    .value();
  return updateAgentSplitPercent(agentFilterList);
};
export default (state: any, action: any) => {
  const { id } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const agentData = lodash.get(draftState, 'agentData');
    const agentList = lodash.get(draftState, 'businessData.agentList');
    const agentFilterList = updateAgentList(agentList, id);
    const agentFilterData = updateAgentList(agentData, id);
    lodash.set(draftState, `businessData.agentList`, agentFilterList);
    lodash.set(draftState, `agentData`, agentFilterData);
  });
  return {
    ...nextState,
  };
};
