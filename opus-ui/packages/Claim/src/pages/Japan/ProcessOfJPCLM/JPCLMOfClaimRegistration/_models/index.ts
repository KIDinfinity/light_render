import initState from './state';
import effects from './effects';
import reducers from './reducers';
import listeners from './listeners';

export default {
  namespace: 'JPCLMOfClaimRegistrationController',

  state: {
    ...initState,
  },

  effects: {
    ...effects,
    ...listeners,
  },

  reducers: {
    ...reducers,
  },
};
