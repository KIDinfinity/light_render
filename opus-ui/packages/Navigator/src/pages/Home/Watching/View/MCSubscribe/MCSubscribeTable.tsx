import { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { filter } from 'rxjs/operators';
import type { IData} from '@mc';
import { LifeCircle, PurposeCode, MCContext } from '@mc';
import prepareParams from '../Table/prepareParams';

export const enterClaimPage = () => {
  const COMMON_TASK_PATH = '/process/task/detail/';
  const { pathname } = window.location;
  return pathname.indexOf(COMMON_TASK_PATH) !== -1;
};

export default () => {
  const dispatch = useDispatch();
  const { subject } = useContext(MCContext);

  const userId = useSelector((state: any) => state.user.currentUser.userId);
  const stateOfSearch = useSelector((state: any) => state.advancedQueryController.stateOfSearch);
  const listFilter = useSelector((state: any) => state.homeList.filter);

  const abortController = new AbortController();

  const refresh = lodash.debounce(() => {
    dispatch({
      type: 'task/tableList',
      payload: prepareParams({
        userId,
        stateOfSearch,
        filter: listFilter,
      }),
      signal: abortController.signal,
    });

    dispatch({
      type: 'navigatorHomeWatching/getStatusFilterListWithCount',
      signal: abortController.signal,
    });

    return () => {
      abortController.abort();
    };
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
  }, [listFilter, userId, stateOfSearch]);

  return null;
};
