import React, { useEffect } from 'react';
import { useDispatch } from 'dva';
import NotificationList from './NotificationList';
import NotificationNew from './NotificationNew';
import NotificationSent from './NotificationSent';
import NotificationDraft from './NotificationDraft';
import NotificationGroup from './NotificationGroup';

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'chatController/changeSearchVisibleReducer',
      payload: {
        showSearchVisible: true,
      },
    });
  }, []);

  return (
    <div>
      <NotificationList />
      <NotificationNew />
      <NotificationSent />
      <NotificationDraft />
      <NotificationGroup />
    </div>
  );
};
