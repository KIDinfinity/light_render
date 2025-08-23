import state from './state/state';
import effects from './effects/effects';
import reducers from './reducers/reducers';

export default {
  namespace: 'policyDocuments',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
