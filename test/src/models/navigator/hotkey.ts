import dynamicMergedConfigs from '@/components/Hotkey/_models/state/init';
import * as reducers from '@/components/Hotkey/_models/reducers';

export default {
  namespace: 'hotkey',

  state: {
    ...dynamicMergedConfigs,

  },

  effects: {},

  reducers: {
    ...reducers,
  },
};
