import { state, effects, reducers, listeners } from 'ruleEngine/pages/Edit/_models';

export default {
  namespace: 'ruleEngineController',
  state,
  effects: {
    ...effects,
    ...listeners,
  },
  reducers,
};
