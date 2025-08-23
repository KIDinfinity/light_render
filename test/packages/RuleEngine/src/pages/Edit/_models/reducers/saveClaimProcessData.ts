import { produce }  from 'immer';
import saveScenarioCurrentTab from './saveScenarioCurrentTab';
import getRuleSetData from '../../Utils/getRuleSetData';
import { be2fe } from '../functions/flowDataMapping';

const saveRulesSetsInfo = (state: any, action: any) => {
  const { submitRuleSet: data } = action.payload;

  const submitRuleSet = be2fe(data);

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.submitRuleSet = getRuleSetData(submitRuleSet);
  });

  const newState = saveScenarioCurrentTab(nextState, {
    type: 'saveScenarioCurrentTab',
    payload: {
      scenarioCurrentTab: submitRuleSet?.groups?.[0]?.groupId,
    },
  });
  return { ...newState };
};

export default saveRulesSetsInfo;
