import React, { useEffect, useImperativeHandle } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import classNames from 'classnames';
import { Table } from '@/components/TableSearch/FilterInquire';
import TaskDragAssign from '@/components/DnDHelper/TaskDragAssign';
import SwitchDrawerModeHoc from 'navigator/HOC/SwitchDrawerModeHoc';
import { getScrollParams } from '@/utils/inqueryUtils';
import styles from './Table.less';
import taskColumns from './Columns';
import SearchEmpty from '../SearchEmpty';
const TaskTable = ({
  TableSearch,
  handleToDetail,
  handleHeaderCell,
  getSelectedClassName,
  isCapsule,
  getTaskDetail,
  setTaskDetail,
  setCaseDetail,
  setTaskId,
  setProcessInstanceId,
  onRef,
  currentMenu,
  ...res
}: any) => {
  const dispatch = useDispatch();
  const task = useSelector((state: any) => state.task);
  const loading = useSelector((state: any) => state.loading.effects['task/filterList']);
  const stateOfSearch = useSelector((state: any) => state.advancedQueryController.stateOfSearch);
  const taskId = useSelector((state: any) => state.advancedQueryController.taskId);
  const taskColumnConfig = useSelector(
    (state: any) => state.configController.configuration?.task?.resultField || []
  );
  const searchForm = useSelector((state: any) => state.advancedQueryAllForm.searchForm);
  const attachChannelData = task?.filterList;

  useEffect(() => {
    if (!lodash.isEmpty(taskId)) {
      setTaskId(taskId);
    }
  }, [taskId]);

  const components = {
    body: {
      row: TaskDragAssign,
    },
  };

  const getSelectedRowClassName = (record: any, i: any) => {
    const { list } = task?.filterList;

    return getSelectedClassName(list, stateOfSearch, 'taskId', record, i);
  };

  const fnOnRowClick = async (record: any, rowKey: any) => {
    const { list } = lodash.get(task, 'filterList');
    if (TableSearch && list) {
      const newStateOfSearch = TableSearch.getStateOfSearch();
      const { selectable } = newStateOfSearch;

      if (list[rowKey - 1]) {
        lodash.set(selectable, 'prev.id', list[rowKey - 1]?.taskId);
        lodash.set(selectable, 'prev.index', rowKey - 1);
      } else {
        lodash.set(selectable, 'prev.id', null);
        lodash.set(selectable, 'prev.index', null);
      }
      lodash.set(selectable, 'current.id', record?.taskId);
      lodash.set(selectable, 'current.index', rowKey);
      if (list[rowKey + 1]) {
        lodash.set(selectable, 'next.id', list[rowKey + 1]?.taskId);
        lodash.set(selectable, 'next.index', rowKey + 1);
      } else {
        lodash.set(selectable, 'next.id', null);
        lodash.set(selectable, 'next.index', null);
      }

      if (newStateOfSearch) {
        await dispatch({
          type: 'advancedQueryController/saveStateOfSearch',
          payload: {
            stateOfSearch: { selectable },
          },
        });
      }

      await getTaskDetail({
        taskId: record?.taskId,
        processInstanceId: record?.caseNo || record?.procInstId || record?.processInstanceId,
      });
      await setCaseDetail({ ...record });
    }
  };

  const clearProcessState = () => {
    setTaskId('');
    setProcessInstanceId('');
  };
  useImperativeHandle(onRef, () => {
    return {
      fnOnRowClick: fnOnRowClick,
      clearProcessState,
    };
  });
  return (
    <Table
      rowKey="taskId"
      components={components}
      locale={{
        emptyText: <SearchEmpty />,
      }}
      getSelectedRowClassName={getSelectedRowClassName}
      columns={taskColumns(stateOfSearch.orders, taskColumnConfig, handleHeaderCell, {
        sortName: searchForm[2]?.sortName,
        sortOrder: searchForm[2]?.sortOrder,
      })}
      data={attachChannelData}
      scroll={getScrollParams(taskColumnConfig, isCapsule)}
      rowClassName={(record, i) => {
        const selected = getSelectedRowClassName(record, i);
        if (record?.taskStatus === 'error') return classNames(styles.inError, selected);
        return selected;
      }}
      onRow={(record, rowKey) => ({
        index: rowKey,
        record,
        sourcetype: 3,
        setTaskId,
        onClick: () => {
          if (currentMenu?.id !== 'advancedQueryOfTask') {
            return;
          }

          const selected = getSelectedRowClassName(record, rowKey);
          if (!selected) {
            fnOnRowClick(record, rowKey);
          } else if (record?.taskStatus !== 'error') {
            handleToDetail(record);
          }
        },
      })}
      {...res}
      loading={loading}
    />
  );
};

export default SwitchDrawerModeHoc(TaskTable);
