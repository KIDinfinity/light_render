import { LS, LSKey } from '@/utils/cache';

export default () => {
  const chatListCache = LS.getItem(LSKey.GROUPCHATLIST);
  return chatListCache;
};
