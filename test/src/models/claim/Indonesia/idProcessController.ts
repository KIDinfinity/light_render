import initState from 'process/IDCLM/Create/_models/state';
import effects from 'process/IDCLM/Create/_models/effects';
import reducers from 'process/IDCLM/Create/_models/reducers';

export default {
  namespace: 'idProcessController',
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
