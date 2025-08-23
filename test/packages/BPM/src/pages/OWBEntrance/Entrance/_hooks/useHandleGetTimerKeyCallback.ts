import { useCallback } from 'react';
import { getTimerKey } from '@/utils/templateHelper';

export default ({ taskId }: any) => {
  return useCallback(
    ({ buttonCode }) => {
      return getTimerKey({
        id: taskId,
        buttonCode,
      });
    },
    [taskId]
  );
};
