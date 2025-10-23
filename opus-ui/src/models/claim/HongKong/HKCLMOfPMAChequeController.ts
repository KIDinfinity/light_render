//控制器
import reducers from '../../../../packages/Process/HKCLM/PMACheque/_models/reducers';
import initState from '../../../../packages/Process/HKCLM/PMACheque/_models/state';
import effects from '../../../../packages/Process/HKCLM/PMACheque/_models/effects';
export default {
  namespace: 'HKCLMOfPMAChequeController',
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
