import state from 'navigator/pages/AdvancedQuery/UserCardList/_models/state/state';
import effects from 'navigator/pages/AdvancedQuery/UserCardList/_models/effects/effects';
import reducers from 'navigator/pages/AdvancedQuery/UserCardList/_models/reducers/reducers';

export default {
  namespace: 'advancedQueryUserCardController',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
