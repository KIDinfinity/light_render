import { useEffect } from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { ESubjectType } from '../Enums';
import { NAMESPACE } from '../activity.config';

export default ({ taskDetail }: any) => {
  const dispatch = useDispatch();
  const isAssinee = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => !!modelnamepsace.isAssinee
  );

  useEffect(() => {
    (async () => {
      if (!!taskDetail && !lodash.isEmpty(taskDetail)) {
        await dispatch({
          type: 'solutionRead/saveUseId',
        });
        await dispatch({
          type: 'solutionRead/saveTaskDetail',
          payload: {
            taskDetail,
          },
        });
        if (isAssinee) {
          await dispatch({
            type: 'solutionRead/getReaderData',
            payload: {
              subjectType: ESubjectType.INFORMATION,
            },
          });
          await dispatch({
            type: 'solutionRead/getReaderData',
            payload: {
              subjectType: ESubjectType.ENVOY,
            },
          });
        }
        await dispatch({
          type: 'solutionRead/getReaderData',
          payload: {
            subjectType: ESubjectType.ENVOYMEMO,
          },
        });
      }
    })();
  }, [isAssinee, taskDetail, dispatch]);
};
