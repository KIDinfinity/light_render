import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import ChatWindowOfContent from './ChatWindowOfContent';
import ChatWindowOfHistList from './ChatWindowOfHistList';
import MCSubscribeChatWindow from './MCSubscribe/MCSubscribeChatWindow';

export default () => {
  const dispatch = useDispatch();
  const chatWindowHistVisible = useSelector((state) => state.chatController.chatWindowHistVisible);

  useEffect(() => {
    dispatch({
      type: 'chatController/changeSearchVisibleReducer',
      payload: {
        showSearchVisible: false,
      },
    });
  }, []);

  return (
    <>
      {chatWindowHistVisible ? <ChatWindowOfHistList /> : <ChatWindowOfContent />}
      <MCSubscribeChatWindow />
    </>
  );
};
