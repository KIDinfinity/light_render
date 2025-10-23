import state from 'claim/pages/Hospital/_models/state/state';
import effects from 'claim/pages/Hospital/_models/effects/effects';
import reducers from 'claim/pages/Hospital/_models/reducers/reducers';

export default {
  namespace: 'hospitalDetailController',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
