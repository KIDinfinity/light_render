import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import TaskTable from 'packages/Opus/Components/TaskTable';
import { ModalTabs } from 'packages/Opus/Enums';
import { NAMESPACE } from 'packages/Opus/Pages/Home/activity.config';
import React from 'react';
import styles from './index.less';

const getTaskIds = ({ list, type, taskId }: any) => {
  if (taskId) {
    return [taskId];
  }

  if (type === 'all') {
    if (
      lodash.some(list, (item) => item.favourite) &&
      !lodash.every(list, (item) => item.favourite)
    ) {
      return lodash
        .chain(list)
        .filter(({ favourite }: any) => !favourite)
        .map(({ taskId: tId }: any) => tId)
        .value();
    }

    return lodash
      .chain(list)
      .map(({ taskId: tId }: any) => tId)
      .value();
  }
};

const Main = ({
  categoryCode,
  configName,
  resultConfigs = [],
  modalTabs,
  total,
  current,
  list,
  handleRowSelection,
  saveSorterInfofun,
  selectedRowsByPage,
}: any) => {
  const dispatch = useDispatch();

  const initTaskDataLoading = useSelector(
    (state: any) => state.loading.effects[`${NAMESPACE}/initTaskData`]
  );
  const updateTaskDataLoading = useSelector(
    (state: any) => state.loading.effects[`${NAMESPACE}/updateTaskData`]
  );
  const loading = useSelector((state: any) => state.loading.effects[`${NAMESPACE}/getTaskList`]);
  const favoriteLoading = useSelector(
    (state: any) => state.loading.effects[`${NAMESPACE}/getFavoriteTasks`]
  );

  return (
    <TaskTable
      categoryCode={categoryCode}
      tabKey={configName}
      loading={loading || favoriteLoading || initTaskDataLoading || updateTaskDataLoading}
      configs={resultConfigs}
      current={current}
      pageSize="20"
      selectedRowKeys={selectedRowsByPage[current]?.map((item: any) => item.id) || []}
      hasRowSelect={modalTabs === ModalTabs.myTeamTask}
      favouriteProps={{
        showFavourite: modalTabs === ModalTabs.myTask,
        handleFavourite: ({ taskId = '', type }: any) => {
          const taskIds = getTaskIds({ list, type, taskId });

          dispatch({
            type: `${NAMESPACE}/getFavoriteTasks`,
            payload: {
              categoryCode,
              taskIds,
            },
          });
        },
      }}
      list={list}
      total={total}
      handleChange={(extraParams: any) => {
        dispatch({
          type: `${NAMESPACE}/getTaskList`,
          payload: {
            categoryCode,
            extraParams,
          },
        });
      }}
      handleRowSelection={handleRowSelection}
      saveSorterInfofun={saveSorterInfofun}
      rowClassName={(record: any) => (record?.minRemain < 0 ? styles.overdueRow : '')}
    />
  );
};

export default Main;
