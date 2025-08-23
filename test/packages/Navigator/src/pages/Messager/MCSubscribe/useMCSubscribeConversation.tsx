import { useContext, useEffect } from 'react';
import { useDispatch } from 'dva';
import { filter } from 'rxjs/operators';
import type { IData} from '@mc';
import { LifeCircle, PurposeCode, MCContext } from '@mc';

export default () => {
  const dispatch = useDispatch();
  const { subject } = useContext(MCContext);

  useEffect(() => {
    dispatch({
      type: 'converseController/conversationList',
    });

    const subscription = subject
      .pipe(
        filter(
          ({ lifeCircle, data }) =>
            lifeCircle === LifeCircle.OnMessage && data.type === PurposeCode.NewChatMessage
        )
      )
      .subscribe(({ data }: IData) => {
        // 更新 - 会话列表 新会话
        dispatch({
          type: 'converseController/createConversation',
          payload: data,
        });

        // 更新 - 会话(未读、最后一句话的内容和时间、会话置顶)
        dispatch({
          type: 'converseController/updateConversation',
          payload: data,
        });
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return null;
};
