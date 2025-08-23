import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Subject, ReplaySubject } from 'rxjs';
import { LS, LSKey } from '@/utils/cache';
import { safeParseUtil } from '@/utils/utils';
import { AccuracyConfigTool } from '@/utils/accuracy';
import { tenant } from '@/components/Tenant';
import { LifeCircle, PurposeCode } from './constants';
import MessageCenterContext from './Context';
import socket from './websocket';

export const { Provider } = MessageCenterContext;

interface IProviderProps {
  type?: number;
  children: React.ReactNode;
}

/**
 * 注意1：确保拿到userId和token，用户是登录了
 * 注意2：确保webSocket只调用一次，(如果用户登录了呢？如果切换用户了呢？如果刷新页面了呢？)
 *
 */
export default ({ type = 99, children }: IProviderProps) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.user.currentUser.userId);
  const [webSocket, setWebSocket] = useState(null);
  const [subject] = useState(new Subject());
  const [replaySubject] = useState(new ReplaySubject());

  useEffect(() => {
    const token = LS.getItem(LSKey.WTOKEN, false);
    const regionCode = tenant.region();
    const tenantCode = tenant.getTenant();

    if (userId) {
      // 获取货币精确值配置
      AccuracyConfigTool.getListData();
    }
    if (userId && token && type && regionCode && tenantCode) {
      const ws = socket({
        userId,
        token,
        type,
        tenant: tenantCode.toLowerCase(),
        region: regionCode.toLowerCase(),
      });
      ws.onmessage = (e) => {
        const data = safeParseUtil(e?.data);
        subject.next({
          lifeCircle: LifeCircle.OnMessage,
          data,
        });

        if (data.type === PurposeCode.findStorage) {
          dispatch({
            type: `reportCenterController/findStorage`,
          });
        }

        // 我的在线状态，要保存
        if (data.type === PurposeCode.ChatStatus && data.userId === userId) {
          replaySubject.next({
            lifeCircle: LifeCircle.OnMessage,
            data,
          });
        }
        // 更新或者取消服务
        if (
          data.type === PurposeCode.publicService ||
          data.type === PurposeCode.cancelService ||
          data.type === PurposeCode.kickOutService
        ) {
          dispatch({
            type: 'serviceSystemController/updateNote',
            payload: { ...data },
          });
        }
        // OCR推送
        if (data.type === PurposeCode.OCRMessage) {
          dispatch({
            type: `DocumentOfOcrResultsController/updateOCRNote`,
            payload: {
              data: JSON.parse(data.content),
            },
          });
        }
      };
      ws.onclose = () => {
        subject.next({
          lifeCircle: LifeCircle.OnClose,
        });
      };
      ws.onerror = () => {
        subject.next({
          lifeCircle: LifeCircle.OnError,
        });
      };

      setWebSocket(ws as any);
    }
  }, [userId]);

  return (
    <Provider
      value={{
        webSocket,
        subject,
        replaySubject,
      }}
    >
      {children}
    </Provider>
  );
};
