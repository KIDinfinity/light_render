import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from '../activity.config';
import { ESubjectType } from '../Enums';

export default ({ taskId }: any) => {
  const dispatch = useDispatch();
  const taskDetail = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.taskDetail,
    shallowEqual
  );
  const readUserId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.readUserId,
    shallowEqual
  );

  return useMemo(async () => {
    await dispatch({
      type: 'solutionRead/saveUseId',
    });
    if (!taskId || lodash.isEmpty(taskId)) return;
    if (lodash.isEmpty(taskDetail) || taskDetail?.taskId !== taskId) {
      await dispatch({
        type: 'solutionRead/getTaskDetail',
        payload: {
          taskId,
        },
      });
    }

    await dispatch({
      type: 'solutionRead/getReaderData',
      payload: {
        subjectType: ESubjectType.DOC,
      },
    });
  }, [taskId, taskDetail, readUserId, dispatch]);
};
