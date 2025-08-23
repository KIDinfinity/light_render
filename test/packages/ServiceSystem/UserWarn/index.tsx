import React, { useState, useEffect } from 'react';
import moment from 'moment';
import bpm from 'bpm/pages/OWBEntrance';
import { useSelector, useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getLoginPath } from '@/utils/loginUtils';

import { Modal } from 'antd';
import cache from '@/utils/cache';
import { NAMESPACE } from '../activity.config';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();

  const [minute, setMinute] = useState<any>(0);
  const [second, setSecond] = useState<any>(0);

  const { downTime, advancedWarningSeconds, setTime } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.downInfo
  );

  const messageType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.messageType
  );
  const webSocket = useSelector(({ chatController }: any) => chatController.webSocket);

  const excludedRouter = () => {
    const path = window.location.pathname.toLowerCase();
    return path.includes('/operation');
  };

  const outLogin = async () => {
    await bpm.buttonAction('save');
    await cache.clear();
    if (webSocket && webSocket.readyState === 1) {
      webSocket.close();
    }
    // 这里一秒后执行是因为要让在详情页看到保存sna成功提示
    setTimeout(() => {
      window.location.href = getLoginPath();
    }, 1000);
  };

  const Time = () => {
    if (downTime === 0 || advancedWarningSeconds === 0) return;
    if (setTime < 1000) return;
    setTimeout(() => {
      let timer: any = null;
      let overTime = Number(advancedWarningSeconds) * 1000;
      timer = setInterval(() => {
        if (overTime > 1000) {
          overTime -= 1000;

          const newMinute = Math.floor((overTime / 1000 / 60) % 60);
          const newSecond = Math.floor((overTime / 1000) % 60);
          setMinute(newMinute < 10 ? `0${newMinute}` : newMinute);
          setSecond(newSecond < 10 ? `0${newSecond}` : newSecond);
          if (overTime === 1000) {
            outLogin();
          }
        } else {
          clearInterval(timer);
        }
      }, 1000);
    }, setTime);
  };

  useEffect(() => {
    if (!excludedRouter()) {
      Time();
    }
  }, [setTime]);
  useEffect(() => {
    if (!excludedRouter()) {
      dispatch({
        type: `${NAMESPACE}/getServiceDownInfo`,
      });
    }
  }, []);

  const messageComponent = () => {
    let Component = null;

    switch (messageType) {
      case 501:
        if (setTime < 1000) return null;
        Component = (
          <div className={styles.userWran}>
            <span className={styles.warn}>
              {formatMessageApi(
                { Label_COM_WarningMessage: 'MSG_000589' },
                moment(downTime).format('YYYY-MM-DD HH:mm'),
                ''
              )}
            </span>
            <span className={styles.time}>
              {minute !== 0 && `${minute}:`}
              {second !== 0 && second}
            </span>
          </div>
        );
        break;
      case 503:
        Modal.info({
          title: 'This is a notification message',
          content: <div>{formatMessageApi({ Label_COM_WarningMessage: 'MSG_000590' })}</div>,
          okText: <span>{formatMessageApi({ Label_BIZ_Claim: 'Confirm' })}</span>,
          onOk() {
            outLogin();
          },
        });
        break;

      default:
        break;
    }
    return Component;
  };

  return !excludedRouter() ? messageComponent() : null;
};
