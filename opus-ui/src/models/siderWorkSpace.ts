import lodash from 'lodash';

export default {
  namespace: 'siderWorkSpace',
  state: {
    siderState: {
      activityTab: '',
      expanderToggle: '',
      siderToggle: '',
      showExpanderButton: '',
      expanderAvailable: false,
    },
  },
  reducers: {
    // 不要 call 这个 function 除非你知道在干嘛
    setSiderState: (state: any, { payload }: any) => {
      return {
        ...state,
        ...lodash.pick(payload, [
          'activityTab',
          'expanderToggle',
          'siderToggle',
          'showExpanderButton',
          'expanderAvailable',
        ]),
      };
    },
  },
  subscriptions: {},
};
