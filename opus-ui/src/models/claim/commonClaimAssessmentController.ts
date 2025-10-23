import initState from 'process/_modal/Assessment/state';
import effects from 'process/_modal/Assessment/effects';
import reducers from 'process/_modal/Assessment/reducers';

export default {
  namespace: 'commonClaimAssessmentController',

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
