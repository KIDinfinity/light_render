import state from 'packages/Opus/Pages/Home/_models/state';
import effects from 'packages/Opus/Pages/Home/_models/effects';
import reducers from 'packages/Opus/Pages/Home/_models/reducers';

export default {
  namespace: 'opusHome',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
