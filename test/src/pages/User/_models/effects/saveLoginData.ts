import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import moment from 'moment';
import cache, { LS, LSKey, SS, SSKey } from '@/utils/cache';
import { regionMap, DateFormat } from '@/components/Tenant';
import { initialChatList, initialGroupChatList } from '../functions';

export default function* saveLoginData({ payload }: any, { put, select }: any) {
  cache.clear();

  // SSO登陆异常信息
  const loginError: Object = yield select((state: any) => state.login.loginError);
  if (!lodash.isEmpty(loginError)) {
    yield put({
      type: 'saveloginError',
      payload: {
        loginError: {},
      },
    });
  }

  const { response, type } = payload;

  yield put({
    type: 'changeLoginStatus',
    payload: {
      ...response,
      currentAuthority: ['user'],
    },
  });

  if (lodash.isPlainObject(response.resultData)) {
    const { userInfo, roles, region, token, tenant } = response.resultData;
    yield put({
      type: 'user/saveCurrent',
      payload: {
        currentUser: userInfo,
        currentUserRoles: roles,
      },
    });

    if (userInfo?.userId && userInfo?.userName) {
      // 缓存用户信息
      LS.setItem(LSKey.CURRENTUSER, {
        ...userInfo,
        region: region.toUpperCase(),
      });
      // 缓存token，连接websocket时需要
      LS.setItem(LSKey.WTOKEN, token);
      // 缓存聊天sessions
      LS.setItem(LSKey.CHATLIST, initialChatList(response));
      LS.setItem(LSKey.GROUPCHATLIST, initialGroupChatList());
      // 缓存登录信息
      LS.setItem(LSKey.LOGIN_MODE, {
        region: region.toUpperCase(),
        accountName: userInfo?.userId,
        type,
      });
      SS.removeItem(`${SSKey.DICTIONARY}_${region}`);
      SS.removeItem(SSKey.SSOLOGIN_RESULT);
    }

    // 缓存用户role（角色）信息
    if (roles && roles?.length > 0) {
      LS.setItem(LSKey.CURRENTUSERROLES, roles);
    }

    // 缓存用户多租户信息
    if (region) {
      const dateFormat =
        regionMap.find((item) => item.region === region.toUpperCase())?.dateFormat ||
        DateFormat.ENUS;
      SS.setItem(SSKey.CONFIGS, {
        ...SS.getItem(SSKey.CONFIGS),
        region: region.toUpperCase(),
        tenant: tenant.toUpperCase(),
        dateFormat,
      });
      // 设置moment的时间格式
      moment.locale(dateFormat);
    }
  }

  // 登录日志
  const traceId = uuidv4();
  const spanId = uuidv4();
  // 用于登出日志
  SS.setItem(SSKey.TAT_TRANCE_ID, {
    traceId,
    spanId,
  });
  // 打登录日志
  yield put({
    type: 'logTat',
    payload: {
      operator: response?.resultData?.userInfo.userId,
      operation: 'login',
      traceStatus: 0,
      traceId,
      spanId,
    },
  });

  return true;
}
