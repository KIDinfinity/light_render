import React from 'react';
import { Icon } from 'antd';
import { useDispatch, useSelector } from 'dva';
import TaskStatus from 'claim/enum/TaskStatus';
import { ReactComponent as IconInquiry } from 'navigator/assets/icon-mode-inquiry.svg';
import { TaskFilterEnum } from 'navigator/pages/Home/Watching/Enum';
import styles from './Search.less';

interface IExtraParams {
  caseCategory?: any;
  assignee?: any;
  taskStatus?: any;
}

export default function Search() {
  const dispatch = useDispatch();
  const currentCaseCategory =
    useSelector((state: any) => state.homeTaskFlow.currentCaseCategory) || {};
  const filter = useSelector((state: any) => state.homeList.filter);
  const mode = useSelector((state: any) => state.navigatorHomeWatching.mode);
  const userId = useSelector((state: any) => state.user.currentUser?.userId);

  const openAdvancedQuery = async () => {
    await dispatch({
      type: 'advancedQueryAllForm/saveSearchStatus',
      payload: {
        searchStatus: false,
      },
    });
    // 初始化用户操作状态
    dispatch({
      type: 'advancedQueryController/initStateOfSearch',
    });

    dispatch({
      type: 'navigatorHomeWatching/saveModeEnter',
      payload: {
        enterActive: 'inactive',
      },
    });

    const extraParams: IExtraParams = {};
    if (mode === 'flow') {
      extraParams.caseCategory = currentCaseCategory.caseCategory;
    } else if (filter === TaskFilterEnum.Unassigned) {
      extraParams.assignee = [TaskFilterEnum.Unassigned];
      extraParams.taskStatus = [TaskStatus.Todo];
    } else {
      extraParams.assignee = [userId];
      if (filter === TaskFilterEnum.Favorite) {
        extraParams.taskStatus = [];
      } else {
        extraParams.taskStatus = filter;
      }
    }

    dispatch({
      type: 'advancedQueryController/enter',
      payload: {
        tabIndex: '2',
        stateOfSearch: {
          // VENUSHK-1653
          // params: {
          //   ...params,
          //   assignee: params.assignees,
          //   ...extraParams,
          // },
        },
      },
    });
  };

  return (
    <div className={styles.container} onClick={openAdvancedQuery}>
      <Icon className={styles.icon} component={IconInquiry} />
    </div>
  );
}
