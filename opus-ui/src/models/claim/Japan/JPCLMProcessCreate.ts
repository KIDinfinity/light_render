import initState from 'process/JPCLM/Create/_models/state';
import effects from 'process/JPCLM/Create/_models/effects';
import reducers from 'process/JPCLM/Create/_models/reducers';

export default {
  namespace: 'JPCLMProcessCreate',
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
