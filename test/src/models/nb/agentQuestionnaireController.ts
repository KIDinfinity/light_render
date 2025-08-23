import state from 'process/NB/components/AgentQuestionnaire/_models/state';
import effects from 'process/NB/components/AgentQuestionnaire/_models/effects';
import reducers from 'process/NB/components/AgentQuestionnaire/_models/reducers';

export default {
  namespace: 'agentQuestionnaireController',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
