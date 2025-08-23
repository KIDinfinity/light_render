enum Filter {
  t = 'todo',
  p = 'pending',
  f = 'favorite',
  c = 'completed',
  u = 'unassigned',
}

const params = new URLSearchParams(window.location.search);
const isRedirect = params.get('redirect');
const hasStatus = new URLSearchParams(params).get('initStatus');
let initFilter = Filter.t;

if (isRedirect) {
  initFilter =
    Filter[new URL(isRedirect).searchParams.get('initStatus')?.[0] || 't'] || Filter.t;
}

if (hasStatus) {
  initFilter = Filter[hasStatus[0] || 't'] || Filter.t;
}

export default {
  namespace: 'homeList',

  state: {
    filter: initFilter,
    params: {},
  },

  effects: {},

  reducers: {
    saveFilter(state: any, action: any) {
      const {
        payload: { filter },
      } = action;

      return {
        ...state,
        filter,
      };
    },
  },
};
