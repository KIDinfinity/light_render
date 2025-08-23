import initState from 'process/THCLM/Create/_models/state';
import effects from 'process/THCLM/Create/_models/effects';
import reducers from 'process/THCLM/Create/_models/reducers';

export default {
  namespace: 'thProcessController',
  state: {
    ...initState,
  },

  effects: {
    ...effects,
  },

  reducers: {
    ...reducers,
  },
};
