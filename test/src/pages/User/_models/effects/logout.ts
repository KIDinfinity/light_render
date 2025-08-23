import { logout } from '@/services/loginLogoutControllerService';
import cache, { SS, SSKey } from '@/utils/cache';
import { getLoginPath } from '@/utils/loginUtils';
import lodash from 'lodash';

interface IWebSocket {
  readyState: number;
  close: Function;
}

export default function* logOut({ payload }: any, { call, select, put }: any) {
  yield put({
    type: 'saveLoadingStatus',
    payload: {
      loadingStatus: true,
    },
  });
// 区分手动logout path
  const { manu } = payload || {}
  const userId: string = yield select(({ user }: any) => user.userInfo?.userId);
  const { traceId, spanId } = lodash.pick(SS.getItem(SSKey.TAT_TRANCE_ID), ['traceId', 'spanId']);
  // 接口需要登录Session
  yield put.resolve({
    type: 'logTat',
    payload: {
      operation: 'logout',
      operator: userId,
      traceStatus: 1,
      traceId,
      spanId,
    },
  });

  yield call(logout);
  yield put({
    type: 'saveLoadingStatus',
    payload: {
      loadingStatus: false,
    },
  });

  cache.clear();

  yield put({
    type: 'changeLoginStatus',
    payload: {
      status: false,
      currentAuthority: 'guest',
    },
  });

  // 关闭socket
  const webSocket: IWebSocket = yield select(({ chatController }: any) => chatController.webSocket);
  if (webSocket && webSocket.readyState === 1) {
    webSocket.close();
  }
  window.location.href = getLoginPath(manu);
}
