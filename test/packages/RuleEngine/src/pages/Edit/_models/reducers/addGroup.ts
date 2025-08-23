import { produce }  from 'immer';
import { getGroupData } from '../functions/initGroupItemData';
import saveScenarioCurrentTab from './saveScenarioCurrentTab';

const addGroup = (state: any) => {
  const newGroup = getGroupData();
  const nextState = produce(state, (draftState: any) => {
    const groupList = draftState.submitRuleSet.groups;
    // eslint-disable-next-line no-param-reassign
    draftState.submitRuleSet.groups = [...groupList, newGroup];
  });

  const newState = saveScenarioCurrentTab(nextState, {
    type: 'saveScenarioCurrentTab',
    payload: {
      scenarioCurrentTab: newGroup.groupId,
    },
  });
  return { ...newState };
};

export default addGroup;
