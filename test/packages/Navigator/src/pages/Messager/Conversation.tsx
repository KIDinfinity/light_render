import React from 'react';
import { useSelector } from 'dva';
import ChatWindow from './ChatWindow';
import ConversationList from './ConversationList';

export default () => {
  const chatWindowVisible = useSelector((state: any) => state.chatController.chatWindowVisible);

  return chatWindowVisible ? <ChatWindow /> : <ConversationList />;
};
