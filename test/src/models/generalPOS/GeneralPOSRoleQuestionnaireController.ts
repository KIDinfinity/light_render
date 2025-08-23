import state from 'process/GeneralPOS/common/RoleQuestionnaire/_models/state';
import effects from 'process/GeneralPOS/common/RoleQuestionnaire/_models/effects';
import reducers from 'process/GeneralPOS/common/RoleQuestionnaire/_models/reducers';

export default {
  namespace: 'GeneralPOSRoleQuestionnaireController',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
