import { effects, listeners, reducers, state } from '@/components/AuditLog/_models';

export default {
  namespace: 'auditLogController',

  state: {
    ...state,
  },

  effects: {
    ...effects,
    ...listeners,
  },

  reducers: {
    ...reducers,
  },

  subscriptions: {
    setup({ dispatch }: any) {
      dispatch({
        type: 'onFieldChangedListener',
      });
      dispatch({
        type: 'saveClaimProcessDataListener',
      });
      dispatch({
        type: 'clearClaimProcessDataListener',
      });
    },
  },
};
