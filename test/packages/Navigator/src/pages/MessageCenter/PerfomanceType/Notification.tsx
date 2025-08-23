import React, { useEffect } from 'react';
import { useDispatch } from 'dva';
import { notification, Icon } from 'antd';
import lodash from 'lodash';
import NotificationLink from 'navigator/components/NotificationLink';
import styles from './Notification.less';

const DURATION = 10; // 展示持续时间

export default ({ messageList, removeMessage }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      notification.destroy();
    };
  }, []);
  const message = lodash.first(messageList);
  useEffect(() => {
    if (message?.id) {
      notification.open({
        key: message.id,
        className: 'smartCircle',
        icon: <Icon type="bell" />,
        description: <NotificationLink content={message.description} dispatch={dispatch} />,
        duration: DURATION,
        closable: true,
        onClose: () => {
          removeMessage(message.id);
          if (lodash.isEmpty(messageList)) {
            notification.destroy();
          }
        },
        onClick: async () => {
          removeMessage(message.id);
          notification.close(message.id);
          setTimeout(() => {
            notification.destroy();
          }, 1000);

          dispatch({
            type: 'workspaceSwitchOn/openSmartCircle',
          });
          dispatch({ type: 'smartCircleNotification/showSmartCircleGoBackReducer' });
          
        },
      });
    }
  }, [message]);

  return <div className={styles.wrapper} />;
};
