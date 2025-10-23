import state from 'packages/Opus/Pages/AdvancedQuery/_models/state';
import effects from 'packages/Opus/Pages/AdvancedQuery/_models/effects';
import reducers from 'packages/Opus/Pages/AdvancedQuery/_models/reducers';

export default {
  namespace: 'opusAdvancedSearch',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
