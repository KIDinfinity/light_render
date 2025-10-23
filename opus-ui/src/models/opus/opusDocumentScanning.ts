import state from 'packages/Opus/Pages/Process/Claim/DocumentScanning/_models/state';
import effects from 'packages/Opus/Pages/Process/Claim/DocumentScanning/_models/effects';
import reducers from 'packages/Opus/Pages/Process/Claim/DocumentScanning/_models/reducers';

export default {
  namespace: 'opusDocumentScanning',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
