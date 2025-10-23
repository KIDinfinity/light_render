import initState from 'claim/pages/HongKong/ProcessOfCLM/Create/_models/state';
import effects from 'claim/pages/HongKong/ProcessOfCLM/Create/_models/effects';
import reducers from 'claim/pages/HongKong/ProcessOfCLM/Create/_models/reducers';

export default {
  namespace: 'hkProcessController',
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
