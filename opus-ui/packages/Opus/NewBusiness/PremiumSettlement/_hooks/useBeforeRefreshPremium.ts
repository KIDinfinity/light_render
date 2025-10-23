import { useCallback } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'opus/NewBusiness/PremiumSettlement/activity.config';
import ProcessStatusType from 'opus/NewBusiness/PremiumSettlement/Enum/processStatusType';
import useSetProcessStatus from 'opus/NewBusiness/PremiumSettlement/_hooks/useSetProcessStatus';
import { Action } from '@/components/AuditLog/Enum';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default () => {
  const processStatus = useSetProcessStatus();
  const dispatch = useDispatch();
  const taskDetail = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail,
    shallowEqual
  );

  return useCallback(async () => {
    const { taskDefKey } = lodash.pick(taskDetail, ['taskDefKey']);
    if (processStatus === ProcessStatusType.Error) {
      dispatch({
        type: 'auditLogController/logTask',
        payload: {
          action: Action.Retry,
        },
      });
    } else {
      dispatch({
        type: 'auditLogController/logInformation',
        payload: {
          action: Action.Refresh,
          category:
            formatMessageApi({
              activity: taskDefKey,
            }) || '',
        },
      });
    }
  }, [dispatch, processStatus, taskDetail]);
};
