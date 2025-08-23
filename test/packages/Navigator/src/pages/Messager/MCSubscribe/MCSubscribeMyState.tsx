/**
 * MCSubscribe - 我的在线状态
 *
 */
import { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { map, distinctUntilKeyChanged } from 'rxjs/operators';
import { ChatStatus, MCContext } from '@mc';

export default () => {
  const { replaySubject } = useContext(MCContext);
  const myId = useSelector((state) => state.user.currentUser.userId);
  const chatOffline = useSelector((state) => state.chatController.chatOffline);
  const isReconnect = useSelector((state) => state.chatController.isReconnect);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = replaySubject
      .pipe(
        map((value: Object) => value.data),
        distinctUntilKeyChanged('state')
      )
      .subscribe((data: Object) => {
        // 原来的代码是，只要接收到消息，就调用
        if (chatOffline) {
          dispatch({
            type: 'chatOfflineReducer',
            payload: { chatOffline: false },
          });
          dispatch({
            type: 'loadingReconnectReducer',
            payload: { loadingReconnect: false },
          });
        }

        // 更新我的在线状态
        dispatch({
          type: 'chatController/saveChatStatusReducer',
          payload: {
            chatStatus: data.state,
          },
        });

        if (!isReconnect && data.state === ChatStatus.ONLINE) {
          // 重连
          dispatch({
            type: 'chatController/saveIsReconnect',
          });
        }
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [myId, isReconnect, chatOffline]);

  return null;
};
