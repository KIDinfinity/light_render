import { useCallback } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useClientAsyncSubmit from 'basic/hooks/useClientAsyncSubmit';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
export default () => {
  const dispatch = useDispatch();
  const taskDetail = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail,
    shallowEqual
  );
  const handleSubmit = useClientAsyncSubmit({
    requestInterval: 1000,
    requestTimeLimit: 1000 * 60 * 3,
    taskId: taskDetail?.taskId,
  });

  return useCallback(async () => {
    const dataForSubmit = await dispatch({
      type: `${NAMESPACE}/getSubmitClientChangeData`,
    });
    const response = await handleSubmit({
      params: dataForSubmit,
    });
    const { success, resultData }: any = lodash.pick(response, [
      'success',
      'promptMessages',
      'resultData',
    ]);
    if (success) {
      await dispatch({
        type: `${NAMESPACE}/setIndentificationModalVisible`,
        payload: {
          indentificationModalVisible: false,
        },
      });
      await dispatch({
        type: `${NAMESPACE}/updateSelectedClientInfo`,
        payload: {
          businessData: resultData?.businessData,
        },
      });
      return response;
    } else {
      handleErrorMessageIgnoreXErrorNotice(response);
    }
    return response;
  }, [dispatch, handleSubmit]);

  // return lodash.merge(response, { taskId: taskDetail?.taskId });
};
