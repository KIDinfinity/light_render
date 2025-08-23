import { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { filter } from 'rxjs/operators';
import type { IData} from '@mc';
import { LifeCircle, PurposeCode, MCContext } from '@mc';

export default () => {
  const dispatch = useDispatch();
  const { subject } = useContext(MCContext);
  const myId = useSelector((state) => state.user.currentUser.userId);
  const currentChatInfo = useSelector((state) => state.chatController.currentChatInfo);
  const isReconnect = useSelector((state) => state.chatController.isReconnect);

  useEffect(() => {
    const subscription = subject
      .pipe(
        filter(
          ({ lifeCircle, data }: IData) =>
            lifeCircle === LifeCircle.OnMessage &&
            data.type === PurposeCode.NewChatMessage &&
            data.destId === myId && // 信息目标是自己
            data.srcId === currentChatInfo.sessionPeer // 信息发送者是当前聊天对象
        )
      )
      .subscribe(({ data }: IData) => {
        // 设置已读
        dispatch({
          type: 'chatController/cleanUnread',
        });

        // 在聊天窗口，追加新信息
        dispatch({
          type: 'chatController/newMessageOfCurrentChatMessages',
          payload: {
            chatMessage: data,
          },
        });

        // 清空会话列表中，该聊天对象的未读状态
        // dispatch({
        //   type: 'converseController/cleanUnreadOfConveration',
        //   // payload: {
        //   //   sessionId,
        //   // },
        // });
      });

    const subscription1 = subject
      .pipe(
        filter(
          ({ lifeCircle, data }: IData) =>
            lifeCircle === LifeCircle.OnMessage && data.type === PurposeCode.ChatStatus
        )
      )
      .subscribe(({ data }: IData) => {
        if (data.userId === myId && isReconnect) {
          // 自己断线重连 - 更新断线期间遗漏的聊天记录
          dispatch({
            type: 'getBySessionId',
          });
        } else if (data.userId === currentChatInfo.sessionPeer) {
          // 更新 - 聊天对象的状态
          dispatch({
            type: 'updateStateOfCurrentChatInfo',
            payload: {
              ustate: data.state,
            },
          });
        }
      });

    return () => {
      subscription.unsubscribe();
      subscription1.unsubscribe();
    };
  }, [myId, currentChatInfo]);

  return null;
};
