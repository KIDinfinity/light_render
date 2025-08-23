import lodash from 'lodash';
import RBAC from '@/enum/RBAC';
import Authority from '@/enum/Authority';
import { checkUserIfOwnResources } from '@/services/rbac2ResourceControllerService';

interface IResponse {
  success: boolean;
  resultData: Object;
}

export default {
  namespace: 'checkRBAC',

  state: {
    authData: null,
  },

  effects: {
    *checkRBAC(_: any, { call, put }: any) {
      const response: IResponse = yield call(checkUserIfOwnResources, [
        RBAC.RS_CreateCase_enter,
        RBAC.ConfigurationCenter,
      ]);
      if (
        lodash.isPlainObject(response) &&
        response.success &&
        lodash.isPlainObject(response.resultData)
      ) {
        const authData: string[] = lodash
          .keys(response.resultData)
          .filter((key) => response.resultData[key])
          .map((key) => (key === RBAC.RS_CreateCase_enter ? Authority.smartCircle : key));

        yield put({
          type: 'authData',
          payload: {
            authData,
          },
        });

        yield put({
          type: 'login/changeLoginStatus',
          payload: {
            ...response,
            currentAuthority: ['user', ...authData],
          },
        });
      }
    },
  },

  reducers: {
    authData(state: any, action: any) {
      const { payload } = action;

      return {
        ...state,
        authData: payload.authData,
      };
    },
  },
};
