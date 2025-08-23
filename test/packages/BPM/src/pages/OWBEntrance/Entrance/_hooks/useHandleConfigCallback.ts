import { useCallback, useMemo } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import config from 'bpm/pages/OWBEntrance/Sider/ButtonConfig/config';

export default ({
  taskDetail,
  contextDispatch,
  customizationButtonConfig,
  commonActionLife,
}: any) => {
  const dispatch = useDispatch();
  const { taskId } = useMemo(() => {
    return lodash.pick(taskDetail, ['taskId']);
  }, [taskDetail]);
  return useCallback(
    async ({ buttonListFromServer, actionConfig }) => {
      if (buttonListFromServer && actionConfig) {
        return config({
          taskId,
          taskDetail,
          customizationButtonConfig,
          actionConfig,
          dispatch,
          contextDispatch,
          buttonListFromServer,
          commonActionLife,
        });
      }
      return [];
    },
    [taskId, taskDetail, customizationButtonConfig, dispatch, contextDispatch, commonActionLife]
  );
};
