import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { querySnapshotVersion } from '@/services/navigatorTaskInfoControllerService';

interface IParams {
  taskId: string;
  dataType?: string;
  skipSnapshot?: boolean;
}

export default function useGetTaskVersionCallback({ taskId, dataType = 'mainPage' }: IParams) {
  const dispatch = useDispatch();
  return useCallback(async () => {
    const response: any = await querySnapshotVersion({
      taskId,
      dataType,
    });

    await dispatch({
      type: 'task/saveVersion',
      payload: {
        currentVersion: response.resultData?.versionNo,
        dataType,
      },
    });
  }, [taskId]);
}
