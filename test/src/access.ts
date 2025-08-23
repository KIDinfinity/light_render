import { LS, LSKey } from '@/utils/cache';

export default () => {
  return {
    logined: () => LS.getItem(LSKey.AUTHORITY)?.includes?.('user'),
  };
};
