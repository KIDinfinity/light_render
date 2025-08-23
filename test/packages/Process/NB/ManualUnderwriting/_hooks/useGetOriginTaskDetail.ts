import { useMemo } from 'react';
import { useSelector, useDispatch,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { getTask } from '@/services/navigatorTaskOperationControllerService';

export default ({ taskId, dataType, skipSnapshot }: any) => {
  const dispatch = useDispatch();
  const originBizData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.originBizData,
    shallowEqual
  );
  return useMemo(async () => {
    if (lodash.isEmpty(originBizData)) {
      const response: any = await getTask({
        taskId,
        dataType,
        skipSnapshot,
      });

      if (
        lodash.isPlainObject(response) &&
        response.success &&
        lodash.isPlainObject(response.resultData)
      ) {
        dispatch({
          type: 'manualUnderwriting/saveOriginBizData',
          payload: {
            originBizData: response.resultData?.businessData,
          },
        });
        return response.resultData;
      }
    }

    return {};
  }, [taskId]);
};
