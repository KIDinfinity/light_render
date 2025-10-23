import state from 'packages/Opus/Pages/PostProcessing/_models/state';
import effects from 'packages/Opus/Pages/PostProcessing/_models/effects';
import reducers from 'packages/Opus/Pages/PostProcessing/_models/reducers';

export default {
  namespace: 'opusPostProcessing',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
