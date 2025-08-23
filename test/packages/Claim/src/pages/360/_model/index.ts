import state from './state';

import effects from './effects';

import reducers from './reducers';

export default {
  namespace: 'insured360',

  state,

  reducers,

  effects: {
    ...effects,
  },
};
