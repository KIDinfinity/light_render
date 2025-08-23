import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useSelector, useDispatch } from 'dva';
import classNames from 'classnames';
import lodash from 'lodash';
import { dashboardPageSize } from '@/utils/constant';
import TaskDragAssign from '@/components/DnDHelper/TaskDragAssign';
import { HotkeyHomeIds } from '@/components/Hotkey/common/enum/hotkeyIds';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import { getHomeFiltes } from '../../_hooks';
import getColumns from './columns';
import paginationItemRender from './paginationItemRender';
import handleTableChange from './handleTableChange';
import handleRowSelectable from './handleRowSelectable';
import isSelected from './isSelected';
import styles from './Table.less';

let isFocusForOneSec = false,
  timeout: false | number = false;
const TaskTable = React.memo(
  ({ getTaskDetail }: any) => {
    const dispatch = useDispatch();
    const stateOfSearch = useSelector((state: any) => state.advancedQueryController.stateOfSearch);
    const resultField =
      useSelector(
        (state) => state.configController?.configuration?.[state.homeList?.filter]?.resultField
      ) || [];
    const tableList = useSelector((state: any) => state.task.tableList);
    const dataSource = tableList?.list || [];
    const pagination = tableList?.pagination || {};

    const loading = useSelector((state: any) => state.loading.effects['task/tableList']);

    const filterParams =
      useSelector((state: any) => state.navigatorHomeWatching.filterParams) || {};
    const filterObj = getHomeFiltes();

    const { HomeWatchingTableModule, HomeWatchingTable } = HotkeyHomeIds;
    const moduleFocus = useSelector(
      (state: any) =>
        state.hotkey.selectModule === HomeWatchingTableModule &&
        state.navigatorHomeWatching.listParams === HomeWatchingTable
    );
    const handleTitleChange = (changeValue: any) => {
      // 保存额外的参数
      dispatch({
        type: 'navigatorHomeWatching/saveFilterParams',
        payload: {
          changeValue,
        },
      });
    };

    const paginationSizeChangeHandle = (e, size) => {
      dispatch({
        type: 'task/save',
        payload: {
          tableList: {
            ...tableList,
            pagination: {
              ...pagination,
              pageSize: size,
            },
          },
        },
      });
    };

    useEffect(() => {
      const record: any = lodash.head(dataSource);
      if (record) {
        setTimeout(() => {
          getTaskDetail({
            taskId: record.taskId,
            processInstanceId: record.caseNo || record.procInstId || record.processInstanceId,
          });
        }, 100);
      }
    }, [dataSource]);

    return (
      <Table
        rowKey="key"
        columns={getColumns({
          orders: stateOfSearch?.orders,
          resultField,
          filterParams,
          filterObj,
          handleTitleChange,
        })}
        pagination={{
          pageSize: pagination.pageSize || dashboardPageSize,
          itemRender: paginationItemRender,
          current: pagination.page || stateOfSearch?.pagination?.currentPage || 1,
          total: pagination.total,
          showSizeChanger: true,
          pageSizeOptions: ['8', '10', '20', '30', '40', '50'],
          onShowSizeChange: paginationSizeChangeHandle,
        }}
        loading={loading}
        dataSource={dataSource}
        className={classNames(styles.table, 'guidance-newTable-container-one')}
        scroll={{
          y: 'calc(100% - 3rem)',
          x: 'max-content',
          scrollToFirstRowOnChange: true,
        }}
        onChange={(paginationTable, filters, sorter) => {
          dispatch({
            type: 'advancedQueryController/saveStateOfSearch',
            payload: {
              stateOfSearch: handleTableChange(paginationTable, filters, sorter),
            },
          });
        }}
        rowClassName={(record: any, index: number) => {
          const selected = isSelected({ dataSource, stateOfSearch, record, index });
          const activeFocus = moduleFocus && selected && !isFocusForOneSec;
          if (!isFocusForOneSec && !timeout && moduleFocus) {
            timeout = setTimeout(() => {
              isFocusForOneSec = true;
            }, 1000);
          }
          if (!moduleFocus) {
            if (timeout) clearTimeout(timeout);
            timeout = false;
            isFocusForOneSec = false;
          }
          if (activeFocus && record.taskStatus === 'error')
            return classNames(styles.inError, styles.activeFocus, selected);
          if (record.taskStatus === 'error') return classNames(styles.inError, selected);
          if (activeFocus) return classNames(styles.activeFocus, selected);
          return selected;
        }}
        onRow={(record: any, index: number) => ({
          record,
          index,
          sourcetype: 1,
          onClick: () => {
            if (!isSelected({ dataSource, stateOfSearch, record, index })) {
              dispatch({
                type: 'advancedQueryController/saveStateOfSearch',
                payload: {
                  stateOfSearch: handleRowSelectable({ record, index, dataSource, stateOfSearch }),
                },
              });

              getTaskDetail({
                taskId: record.taskId,
                processInstanceId: record.caseNo || record.procInstId || record.processInstanceId,
              });
            } else if (record.taskStatus !== 'error') {
              dispatch({
                type: 'global/visitTaskDetail',
                payload: record,
              });
            }
          },
        })}
        components={{
          body: {
            row: TaskDragAssign,
          },
        }}
      />
    );
  },
  (props, nextProps) => {
    return props.getTaskDetail === nextProps.getTaskDetail;
  }
);

export default () => (
  <CaseTaskDetail.Consumer>
    <TaskTable />
  </CaseTaskDetail.Consumer>
);
