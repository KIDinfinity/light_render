import lodash from 'lodash';
import { LS, LSKey, SS, SSKey } from '@/utils/cache';

export default {
  namespace: 'user',

  state: {
    currentUser: {},
    currentUserRoles: [],
  },

  effects: {
    *fetchCurrent(_: any, { put }: any) {
      const currentUser = LS.getItem(LSKey.CURRENTUSER);

      if (!currentUser?.userId || !currentUser?.userName) {
        const golbalConfig = SS.getItem(SSKey.CONFIGS);
        if (golbalConfig.loginMode?.ssoConfig?.isOpenSso) return;

        yield put({
          type: 'login/logout',
        });
      } else {
        const currentUserRoles = LS.getItem(LSKey.CURRENTUSERROLES) || [];
        yield put({
          type: 'saveCurrent',
          payload: {
            currentUser,
            currentUserRoles,
          },
        });
      }
    },
  },

  reducers: {
    saveCurrent(state: any, { payload }: any) {
      const { currentUser, currentUserRoles } = payload;

      if (lodash.isPlainObject(currentUser)) {
        return {
          ...state,
          currentUser,
          currentUserRoles,
        };
      }

      return { ...state };
    },
  },
};
