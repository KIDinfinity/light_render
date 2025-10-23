import React from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import NAMESPACE from 'opus/Pages/PostProcessing/_models/nameSpace';
import TaskTable from 'opus/Components/TaskTable';
import { TaskTabs, ModalTabs } from 'opus/Enums';

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
  myTaskTab,
  categoryCode,
  resultConfigs,
  total,
  current,
  list,
  handleRowSelection,
  selectedRowsByPage,
  modalTab,
}: any) => {
  const dispatch = useDispatch();

  const loading = useSelector((state: any) => state.loading.effects[`${NAMESPACE}/getTaskList`]);

  return (
    <TaskTable
      loading={loading}
      configs={resultConfigs}
      current={current}
      list={list}
      total={total}
      selectedRowKeys={selectedRowsByPage[current]?.map((item: any) => item.taskId) || []}
      hasRowSelect={true}
      handleRowSelection={handleRowSelection}
      favouriteProps={{
        showFavourite: myTaskTab === TaskTabs.todo && modalTab === ModalTabs.myTask,
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
      handleChange={(extraParams: any) => {
        dispatch({
          type: `${NAMESPACE}/getTaskList`,
          payload: {
            categoryCode,
            extraParams,
          },
        });
      }}
    />
  );
};

export default Main;
