import { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { filter } from 'rxjs/operators';
import type { IData} from '@mc';
import { LifeCircle, PurposeCode, MCContext } from '@mc';

export const enterClaimPage = () => {
  const COMMON_TASK_PATH = '/process/task/detail/';
  const { pathname } = window.location;
  return pathname.indexOf(COMMON_TASK_PATH) !== -1;
};

export default () => {
  const dispatch = useDispatch();
  const { subject } = useContext(MCContext);

  const userId = useSelector((state: any) => state.user.currentUser.userId);
  const taskList = useSelector((state: any) => state.task.taskList);
  const listFilter = useSelector((state: any) => state.homeList.filter);

  const abortController = new AbortController();

  const refresh = lodash.debounce(async () => {
    await dispatch({
      type: 'task/list',
      payload: {
        pageSize: 10,
        params: {
          assignee: userId,
          taskStatus: listFilter,
        },
      },
      signal: abortController.signal,
    });

    dispatch({
      type: 'navigatorHomeWatching/getStatusFilterListWithCount',
      signal: abortController.signal,
    });
  }, 3000);

  useEffect(() => {
    const subscription = subject
      .pipe(
        filter(
          ({ lifeCircle, data }: IData) =>
            lifeCircle === LifeCircle.OnMessage &&
            data.type === PurposeCode.taskList &&
            !enterClaimPage()
        )
      )
      .subscribe(() => {
        refresh();
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [taskList]);

  return null;
};
