import lodash from 'lodash';
import { LS, LSKey } from '@/utils/cache';

export default (response: any) => {
  const chatListCache = LS.getItem(LSKey.CHATLIST);
  const chatList = chatListCache?.user || {};

  // 聊天 sessions
  lodash.set(chatList, 'user.name', response?.resultData?.userInfo?.userName);
  lodash.set(chatList, 'user.id', response?.resultData?.userInfo?.userId);
  lodash.set(chatList, 'currentUserId', response?.resultData?.userInfo?.userName);

  const currentChat = chatList?.sessions?.find(
    (item) => item.id === response?.resultData?.userInfo?.userId
  );

  chatList.currentChat = currentChat || {};

  return chatList;
};
