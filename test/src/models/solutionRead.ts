import state from '@/components/SolutionRead/_models/state';
import effects from '@/components/SolutionRead/_models/effects';
import reducers from '@/components/SolutionRead/_models/reducers';

export default {
  namespace: 'solutionRead',

  state: {
    ...state,
  },

  effects: {
    ...effects,
  },

  reducers: {
    ...reducers,
  },
};
