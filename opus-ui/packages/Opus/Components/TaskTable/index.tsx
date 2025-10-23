import { Table } from 'antd';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import classNames from 'classnames';
import { history } from 'umi';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import TaskStatus from 'enum/TaskStatus';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import EmptyText from '../EmptyData/Table';
import Columns from './Columns';
import styles from './index.less';
import { useSelector } from 'umi';
import { objectToSearchParams } from '@/utils/history';
import CaseCategory from 'enum/CaseCategory';

const Main = ({
  categoryCode,
  favouriteProps = {},
  configs,
  current,
  disableOnRow = false,
  list,
  localColumns,
  selectedRowKeys,
  total,
  pageSize = 10,
  totalTitle,
  hasRowSelect = false,
  filterProps,
  handleChange,
  saveSorterInfofun,
  handleRowSelection,
  loading = false,
  rowClassName,
  rowKey,
  advancedQuery = false,
  hidenTotal = false,
}: any) => {
  const dispatch = useDispatch();

  const [sortedInfo, setSortedInfo] = useState({});

  const rowSelection = useMemo(() => {
    const config: any = {
      preserveSelectedRowKeys: true,
      onChange: (selects: any, selectedRows: any) => {
        if (handleRowSelection) {
          handleRowSelection(selectedRows, current);
        }
      },
    };

    if (selectedRowKeys) {
      config.selectedRowKeys = selectedRowKeys;
    }

    return config;
  }, [current, handleRowSelection, selectedRowKeys]);

  const handleToDetail = useCallback(
    (record) => {
      dispatch({
        type: 'global/visitOpusTaskDetail',
        payload: record,
      });
    },
    [dispatch]
  );
  const filterChoice =
    useSelector(({ opusAdvancedSearch }: any) => opusAdvancedSearch?.taskData?.filterChoice) || [];
  useEffect(() => {
    const extraParams: any = {};
    if (!lodash.isEmpty(filterChoice) && handleChange && advancedQuery) {
      handleChange(extraParams);
    }
  }, [window.location.pathname]);
  return (
    <div className={classNames(styles.tableWrap, hidenTotal && styles.hidenTotalWrap)}>
      <Table
        bordered
        loading={loading}
        rowSelection={hasRowSelect ? rowSelection : null}
        // 这里如果使用taskId的话后端会有重复数据，点击下一页会有数据问题
        rowKey={rowKey || 'taskId'}
        rowClassName={rowClassName}
        columns={Columns({
          configs,
          sortedInfo,
          filterProps,
          localColumns,
          favouriteProps,
          categoryCode,
        })}
        dataSource={lodash.cloneDeep(list)}
        onChange={(pagination: any, filters, sorter) => {
          let extraParams: any = {};

          if (!lodash.isEmpty(pagination)) {
            const { current: currentPage } = pagination || {};
            extraParams = {
              ...extraParams,
              currentPage,
            };
          }
          if (!lodash.isEmpty(sorter)) {
            const sorterDatas = !!sorter.order
              ? {
                  sortName: sorter.field || (sorter.column as any)?.fieldCode,
                  sortOrder: lodash.includes(sorter.order, 'ascend')
                    ? 'asc'
                    : lodash.includes(sorter.order, 'desc')
                      ? 'desc'
                      : '',
                }
              : {
                  sortName: '',
                  sortOrder: '',
                };
            extraParams = {
              ...extraParams,
              ...sorterDatas,
            };

            setSortedInfo({ sortName: sorterDatas.sortName, sortOrder: sorter.order });
            if (lodash.isFunction(saveSorterInfofun)) {
              saveSorterInfofun(sorterDatas);
            }
          }
          if (!lodash.isEmpty(extraParams) && handleChange) {
            handleChange(extraParams);
          }
        }}
        scroll={{ x: true }}
        pagination={{ current, pageSize, total }}
        locale={{ emptyText: !!loading ? <></> : <EmptyText /> }}
        onRow={(record: any) => ({
          onClick: () => {
            // 做成通用的，如果为true说明说vip Case 并且没有权限进去，如果不是VIP 或者是 VIP 但是有权限进入就不为true,能进入。
            const noPermissionEntryVip = record?.disableNavigation;

            if (noPermissionEntryVip) {
              return;
            }

            if (!disableOnRow) {
              if (
                record?.caseStatus === TaskStatus.completed &&
                [
                  CaseCategory.HK_PAPER_CTG001,
                  CaseCategory.HK_POS_CTG001,
                  'HK_POS_CTG003',
                  'BP_POS_CTG011',
                  'BP_CDD_CTG001',
                ].includes(record?.caseCategory)
              ) {
                const extra = !!record?.autoActivity
                  ? {
                      taskId: record.taskId,
                    }
                  : {};
                history.push({
                  pathname: '/opus/pos/history',
                  search: objectToSearchParams({
                    caseCategory: record.caseCategory,
                    businessNo: record.businessNo || record.inquiryBusinessNo,
                    caseNo: record.caseNo,
                    ...extra,
                  }),
                });
              } else if (record?.caseStatus === TaskStatus.completed || !!record?.autoActivity) {
                const extra = !!record?.autoActivity
                  ? {
                      taskId: record.taskId,
                    }
                  : {};
                history.push({
                  pathname: '/opus/case/history',
                  search: objectToSearchParams({
                    caseCategory: record.caseCategory,
                    businessNo: record.businessNo,
                    caseNo: record.caseNo,
                    ...extra,
                  }),
                });
              } else if (
                [TaskStatus.completed, TaskStatus.withdrawal].includes(record?.status) ||
                !!record?.autoActivity
              ) {
                const extra = !!record?.autoActivity
                  ? {
                      taskId: record.taskId,
                    }
                  : {};

                history.push({
                  pathname: '/opus/nb/history',
                  search: objectToSearchParams({
                    caseCategory: record.caseCategory,
                    businessNo: record.businessNo || record.inquiryBusinessNo,
                    caseNo: record.caseNo,
                    ...extra,
                  }),
                });
              } else {
                handleToDetail(record);
              }
            }
          },
        })}
      />
      {!lodash.isEmpty(list) && !hidenTotal && (
        <div className={styles.totalWrap}>
          {!!totalTitle ? totalTitle : formatMessageApi({ Label_COM_Opus: 'TotalCases' }, total)}
        </div>
      )}
    </div>
  );
};

export default Main;
