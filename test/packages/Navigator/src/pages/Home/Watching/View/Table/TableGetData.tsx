import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import MCSubscribeTable from '../MCSubscribe/MCSubscribeTable';
import prepareParams from './prepareParams';

type ICompareEffectDeps = any[] | undefined;

const useCompareEffect = (fn: () => void, deps: ICompareEffectDeps) => {
  const renderRef = useRef<number>(0);
  const depsRef = useRef<ICompareEffectDeps>(deps);

  if (!lodash.isEqual(deps, depsRef.current)) {
    renderRef.current += 1;
  }
  depsRef.current = deps;
  return useEffect(fn, [renderRef.current]);
};

export default () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.user.currentUser.userId);
  const stateOfSearch = useSelector((state: any) => state.advancedQueryController.stateOfSearch);
  const filterParams = useSelector((state: any) => state.navigatorHomeWatching.filterParams) || {};
  const filter = useSelector((state: any) => state.homeList.filter);
  const assigneeFlag = useSelector((state: any) => state.contactsAssigneeList.assigneeFlag);
  const abortController = new AbortController();

  useCompareEffect(() => {
    dispatch({
      type: 'task/tableList',
      payload: prepareParams({
        userId,
        stateOfSearch,
        filter,
        params: {
          params: filterParams,
        },
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
  }, [userId, lodash.omit(stateOfSearch, ['selectable']), filter, assigneeFlag, filterParams]);

  return (
    <MCSubscribeTable />
  );
};
