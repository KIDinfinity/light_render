import { effects, reducers, state } from '@/components/SwitchDrawer/_models';

export default {
  namespace: 'workspaceSwitchOn',

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
