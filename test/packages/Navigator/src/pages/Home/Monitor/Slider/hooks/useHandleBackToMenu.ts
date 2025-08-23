import { useCallback } from 'react';
import navigator from 'navigator/api';

export default () => {
  return useCallback(() => {
    navigator.SiderWorkSpaceController.send('backMonitorMenu');
  }, [navigator]);
};
