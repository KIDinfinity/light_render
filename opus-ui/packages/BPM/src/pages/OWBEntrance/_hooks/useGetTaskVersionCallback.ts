import { useCallback } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { querySnapshotVersion } from '@/services/navigatorTaskInfoControllerService';
import ForceUpdateModal from 'claim/utils/ForceUpdateModal';

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

    const forceUpdateFlag = lodash.get(response, 'resultData.forceUpdateFlag', '');

    if (forceUpdateFlag === 'Y') {
      await ForceUpdateModal({ dispatch, showModal: false });
    }

    await dispatch({
      type: 'task/saveVersion',
      payload: {
        currentVersion: response.resultData?.versionNo,
        dataType,
      },
    });
  }, [taskId]);
}
