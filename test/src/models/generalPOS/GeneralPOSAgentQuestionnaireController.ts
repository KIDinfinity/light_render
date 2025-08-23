import state from 'process/GeneralPOS/common/AgentQuestionnaire/_models/state';
import effects from 'process/GeneralPOS/common/AgentQuestionnaire/_models/effects';
import reducers from 'process/GeneralPOS/common/AgentQuestionnaire/_models/reducers';

export default {
  namespace: 'GeneralPOSAgentQuestionnaireController',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
