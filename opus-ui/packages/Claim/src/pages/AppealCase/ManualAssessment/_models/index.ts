import state from './state';
import effects from './effects';
import reducers from './reducers';

export default {
  namespace: 'MaAppealCaseController',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
