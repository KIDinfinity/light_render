import { useCallback } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { notification } from 'antd';
import lodash from 'lodash';
import { Action } from '@/components/AuditLog/Enum';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import addUpdateDate from '@/utils/addUpdateDate';
import useClientAsyncSubmit from 'basic/hooks/useClientAsyncSubmit';
import { getSubmitData } from '@/utils/modelUtils/nbUtils';
import { eOperationType } from '@/enum/eOperationType';
import { deleteData } from '@/services/dcSnapshotService';
import usePublishEnvoyRefresh from '@mc/hooks/usePublishEnvoyRefresh';

export default ({ setLoading }: any) => {
  const dispatch = useDispatch();
  const taskDetail = useSelector(({ processTask }: any) => processTask.getTask || {}, shallowEqual);
  const handleSubmit = useClientAsyncSubmit({
    requestInterval: 1000,
    requestTimeLimit: 1000 * 60 * 3,
    taskId: taskDetail?.taskId,
  });
  const handlePublishEnvoyRefresh = usePublishEnvoyRefresh();
  return useCallback(async () => {
    setLoading(true);

    dispatch({
      type: 'auditLogController/logTask',
      payload: {
        action: Action.GetUWMeResult,
      },
    });

    const data = await dispatch({
      type: `${NAMESPACE}/getDataForSubmit`,
    });

    const dataForSubmit = getSubmitData({
      taskDetail,
      dataForSubmit: data,
      operationType: eOperationType.getUWMEResult,
    });

    const res: any = await handleSubmit({
      params: dataForSubmit,
    });
    const { businessNo, taskId } = lodash.pick(taskDetail, ['businessNo', 'taskId']);
    if (lodash.isPlainObject(res) && res.success && !lodash.isEmpty(res.resultData)) {
      handlePublishEnvoyRefresh();
      await deleteData({
        businessNo,
        dataType: 'mainPage',
        taskId,
      });
    }
    const failCloseEnquiry = lodash.get(res, 'resultData.businessData.failCloseEnquiry', 'Y');
    if (failCloseEnquiry === 'N') {
      notification.success({
        message: formatMessageApi({
          Label_COM_WarningMessage: 'venus_bpm.message.retry.success',
        }),
      });
    }

    if (res?.success) {
      await addUpdateDate(lodash.get(res, 'resultData.businessData.caseNo'));

      dispatch({
        type: `${NAMESPACE}/saveBizData`,
        payload: {
          businessData: lodash.get(res, 'resultData.businessData', {}),
        },
      });
    }
    if (res?.success && failCloseEnquiry === 'Y') {
      handleErrorMessageIgnoreXErrorNotice({
        promptMessages: [
          {
            code: 'MSG_000689',
            content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000689' }),
          },
        ],
      });
    }
    setLoading(false);
  }, [dispatch, setLoading, handleSubmit, taskDetail, handlePublishEnvoyRefresh]);
};
