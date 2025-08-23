import lodash from 'lodash';

export default {
  namespace: 'mode',
  state: {
    activeMode: '',
    originActiveMode: '',
    modeList: [
      {
        name: 'flow',
      },
      {
        name: 'table',
      },
      {
        name: 'card',
      },
    ],
  },
  reducers: {
    initModes(state, action) {
      const { modeList: oldModeList } = state;
      const modeList = lodash.get(action, 'payload.modeList', []);
      const newModeList = oldModeList.filter((item) => modeList.includes(item.name));
      const activeMode = lodash.get(action, 'payload.activeMode', '');
      return {
        ...state,
        activeMode,
        modeList: newModeList,
        originActiveMode: activeMode,
      };
    },
    resetActiveMode(state) {
      return {
        ...state,
        activeMode: state.originActiveMode,
      };
    },
    setActiveMode(state, action) {
      const activeMode = lodash.get(action, 'payload.activeMode');

      return {
        ...state,
        activeMode,
      };
    },
  },
};
