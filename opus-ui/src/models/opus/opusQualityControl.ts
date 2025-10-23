import state from 'packages/Opus/Pages/QualityControl/_models/state';
import effects from 'packages/Opus/Pages/QualityControl/_models/effects';
import reducers from 'packages/Opus/Pages/QualityControl/_models/reducers';

export default {
  namespace: 'opusQualityControl',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
