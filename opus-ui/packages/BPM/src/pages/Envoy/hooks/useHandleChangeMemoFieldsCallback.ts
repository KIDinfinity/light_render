import { useDispatch, useSelector } from 'dva';
import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import useAutoAddRelateMemoCallback from 'bpm/pages/Envoy/hooks/useAutoAddRelateMemoCallback';

export default ({ reasonId, reasonGroupId, groupCode, groupIdx }: any) => {
  const dispatch = useDispatch();
  const handleAddRelateEnvoy = useAutoAddRelateMemoCallback();
  const taskId = useSelector((state: any) => state.envoyController.taskId, shallowEqual);
  const caseCategory = useSelector(
    (state: any) => state.envoyController.caseCategory,
    shallowEqual
  );
  return useCallback(
    async (names: string[], value: any) => {
      await dispatch({
        type: 'envoyController/saveReasonMemoCode',
        payload: {
          groupId: reasonGroupId,
          dataId: reasonId,
          names,
          value,
        },
      });
      dispatch({
        type: 'envoyController/validateFields',
        payload: {
          dataId: reasonGroupId,
        },
      });
      handleAddRelateEnvoy({
        memoCode: value,
        taskId: taskId,
        reasonGroupCode: groupCode,
        caseCategory: caseCategory,
      });
    },
    [reasonId, dispatch, reasonGroupId, handleAddRelateEnvoy, taskId, caseCategory]
  );
};
