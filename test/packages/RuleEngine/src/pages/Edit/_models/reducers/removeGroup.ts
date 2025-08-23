import lodash from 'lodash';
import saveScenarioCurrentTab from './saveScenarioCurrentTab';

const removeGroup = (state: any, action: any) => {
  const { groupId } = action.payload;

  const nextState = {
    ...state,
    submitRuleSet: {
      ...state.submitRuleSet,
      groups: lodash.filter(state.submitRuleSet.groups, (groupItem: any) => {
        return groupItem.groupId !== groupId;
      }),
    },
  };

  const newState = saveScenarioCurrentTab(nextState, {
    type: 'saveScenarioCurrentTab',
    payload: {
      scenarioCurrentTab: nextState?.submitRuleSet?.groups?.[0]?.groupId,
    },
  });
  return { ...newState };
};

export default removeGroup;
