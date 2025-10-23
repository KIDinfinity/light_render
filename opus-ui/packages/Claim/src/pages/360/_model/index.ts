import state from './state';

import effects from './effects';

import reducers from './reducers';

export default {
  name: 'insured360',

  state,

  reducers,

  effects: {
    ...effects,
  },
};
