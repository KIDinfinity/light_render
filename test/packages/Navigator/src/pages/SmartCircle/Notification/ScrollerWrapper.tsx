import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import Scroller from './Scroller';
import MCSubscribeNotificationList from '../MCSubscribe/MCSubscribeNotificationList';
import BatchBtn from './BatchBtn';
import styles from './ScrollerWrapper.less';

export default () => {
  const dispatch = useDispatch();
  const messageList = useSelector((state: any) => state.smartCircleNotification.messageList);

  useEffect(() => {
    // 更新列表
    dispatch({
      type: 'smartCircleNotification/messageList',
      payload: {
        currentPage: 1,
        isUpdate: true,
        isBackToTop: true,
      },
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      {!lodash.isEmpty(messageList?.rows) && <BatchBtn />}
      <div className={styles.list}>
        <Scroller />
      </div>
      <MCSubscribeNotificationList />
    </div>
  );
};
