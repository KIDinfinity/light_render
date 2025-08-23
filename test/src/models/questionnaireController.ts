import state from 'basic/components/QuestionnaireV2/_models/state';
import effects from 'basic/components/QuestionnaireV2/_models/effects';
import reducers from 'basic/components/QuestionnaireV2/_models/reducers';

export default {
  namespace: 'questionnaireController',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
