import { produce } from 'immer';
import lodash from 'lodash';

export default {
  namespace: 'sequence',
  state: {
    sequence: [],
  },
  reducers: {
    add: (state: any, { payload }: any) => {
      const { namespace, ...res } = payload;
      return produce(state, (draft: any) => {
        const draftState = draft;
        if (lodash.isString(namespace)) {
          if (lodash.isEmpty(draftState[namespace])) {
            lodash.set(draftState, `${namespace}.sequence`, []);
          }
          draftState[namespace].sequence.push({
            ...res,
          });
          return draftState;
        }
        draftState.sequence.push({
          ...res,
        });
      });
    },
    clear: (state: any, { payload }: any) => {
      const { namespace } = payload || {};

      return produce(state, (draft: any) => {
        const draftState = draft;

        if (lodash.isString(namespace) && !lodash.isEmpty(draftState[namespace])) {
          lodash.set(draftState, `${namespace}`, null);
          return draftState;
        }
        lodash.set(draftState, `sequence`, []);
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }: any) {
      history.listen(({location}: any) => {
        if (location?.pathname?.includes?.('claim/task/detail')) {
          dispatch({
            type: 'clear',
          });
        }
      });
    },
  },
};
