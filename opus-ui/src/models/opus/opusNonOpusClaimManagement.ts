import state from 'packages/Opus/Pages/Process/Claim/NonOpusSupportedClaim/_models/state';
import effects from 'packages/Opus/Pages/Process/Claim/NonOpusSupportedClaim/_models/effects';
import reducers from 'packages/Opus/Pages/Process/Claim/NonOpusSupportedClaim/_models/reducers';

export default {
  namespace: 'opusNonOpusClaimManagement',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
