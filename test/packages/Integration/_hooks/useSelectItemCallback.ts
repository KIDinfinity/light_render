import { useCallback } from 'react';
import { useDispatch } from 'dva';
import navigator from 'navigator/api';
import { getIntegrationCallRecordDetail } from '@/services/integrationChecklistControllerService';
import lodash from 'lodash';

export default () => {
  const dispatch = useDispatch();
  return useCallback(async ({ panelItem: renamePanelItem, integrationItem }: any) => {
    navigator.SiderWorkSpaceController.send('turnOnExpander');

    dispatch({
      type: 'integration/saveCurrentPanelId',
      payload: {
        currentPanelId: renamePanelItem?.taskId,
      },
    });
    dispatch({
      type: 'integration/saveCurrentIntegrationId',
      payload: {
        currentIntegrationId: integrationItem?.integrationSessionId,
      },
    });
    const res = await getIntegrationCallRecordDetail({
      ...integrationItem,
    });

    const { success, resultData } = lodash.pick(res, ['success', 'resultData']);

    if (success && resultData) {
      dispatch({
        type: 'integration/saveIntegrationCheckDetail',
        payload: {
          integrationCheckDetail: resultData,
          activityKey: renamePanelItem?.activityKey,
          taskId: renamePanelItem?.taskId,
        },
      });
    }
  }, []);
};
