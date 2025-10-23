import { useCallback } from 'react';

export default ({ autoActionDataCache, setAutoActionDataCache }: any) => {
  return useCallback(
    (action) => {
      action({
        isShowNotice: false,
        isAuto: true,
        autoActionDataCache,
        setAutoActionDataCache,
      });
    },
    [autoActionDataCache, setAutoActionDataCache]
  );
};
