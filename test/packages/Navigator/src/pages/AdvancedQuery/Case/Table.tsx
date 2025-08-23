// @ts-nocheck
import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, notification } from 'antd';
import { history } from 'umi';
import lodash, { get } from 'lodash';
import TableSearch, { Table, Batch } from '@/components/TableSearch/FilterInquire';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getScrollParams } from '@/utils/inqueryUtils';
import AttachSaleSubChannelData from 'navigator/utils/attachSaleSubChannelData';
import advancedQueryOfCaseColumns from './Columns';
import AdvancedQueryOfCaseInquiry from './Inquiry';
import { tarckInquiryPoint, eEventName, eEventOperation } from '@/components/TarckPoint';
import { handleMessageModal } from '@/utils/commonMessage';
import SearchEmpty from '../SearchEmpty';

@connect(
  ({
    advancedQueryController,
    advancedQueryOfCase,
    loading,
    configController,
    advancedQueryAllForm,
  }: any) => ({
    advancedQueryOfCase,
    stateOfSearch: advancedQueryController.stateOfSearch,
    loading: loading.effects['advancedQueryOfCase/list'],
    loadingExportExcel: loading.effects['advancedQueryOfCase/exportExcel'],
    searchObj: advancedQueryController.searchObj,
    caseConfig: configController.configuration?.case || {},
    searchForm: advancedQueryAllForm.searchForm,
  })
)
class AdvancedQueryOfCase extends Component {
  fetchData = async (values = {}) => {
    const { dispatch, stateOfSearch, setTaskId, setProcessInstanceId } = this.props;
    const resultData = await dispatch({
      type: 'advancedQueryOfCase/list',
      payload: {
        ...values,
      },
    });
    const selectIndex = lodash.get(stateOfSearch, 'selectable.current.index', 0) || 0;
    const record = lodash.get(resultData, `rows[${selectIndex}]`, {}) || {};
    await this.fnOnRowClick(record, selectIndex);
    if (resultData?.rows?.length > 0) {
      tarckInquiryPoint(dispatch, {
        ...(values.params || {}),
        eventName: eEventName.caseInquiry,
        eventOperation: eEventOperation.search,
      });
    } else {
      dispatch({
        type: 'navigatorInformationController/clear',
      });
      dispatch({
        type: 'advancedQueryController/resetSelectable',
      });
      setTaskId('');
      setProcessInstanceId('');
    }
  };

  exportExcel = async (values = {}) => {
    const { dispatch, stateOfSearch } = this.props;
    if (!lodash.some(lodash.values(values.params), (item) => !lodash.isEmpty(item))) {
      handleMessageModal([{ content: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000393' }) }]);
      return;
    }
    const resultData = await dispatch({
      type: 'advancedQueryOfCase/exportExcel',
      payload: {
        ...values,
      },
    });
  };

  handleBatchUpdate = async (rows) => {
    const { dispatch } = this.props;

    const response = await dispatch({
      type: 'batchProcess/bundleToBatchProcess',
      payload: lodash.map(rows, (row) => ({
        processInstanceId: row.processInstanceId,
        batchNo: row.batchNo,
        type: 'M', // 手工
        // type: 'A' // 天然
      })),
    });
    if (lodash.get(response, 'success')) {
      notification.success({ message: 'success' });
      this.search.props.setSelectedRows?.([]);
      this.search.props.handleSearch();
    } else {
      const { promptMessages } = response;
      lodash.map(promptMessages, (v) =>
        notification.error({
          message: lodash.get(v, 'content') || 'failed',
        })
      );
    }
  };

  handleBatchDelete = async (rows) => {
    const { dispatch } = this.props;

    const response = await dispatch({
      type: 'batchProcess/deleteBatchProcessListByNo',
      payload: lodash.map(rows, (row) => ({
        processInstanceId: row.processInstanceId,
        batchNo: row.batchNo,
        type: 'M', // 手工
        // type: 'A' // 天然
      })),
    });

    if (lodash.get(response, 'success')) {
      notification.success({ message: 'success' });
      this.search.props.setSelectedRows?.([]);
      this.search.props.handleSearch();
    } else {
      notification.error({
        message: 'failed',
      });
    }

    // TODO 批次字段的显示与UI（找产品和UI确认）：
    // 高级查询
    // 首页-table模式
    // 智能环-简单查询
    // 首页-卡片模式-卡片批
  };

  fnOnRowClick = async (record, rowkey) => {
    const { dispatch } = this.props;

    if (this.TableSearch) {
      const { saveStateOfSearch, advancedQueryOfCase, getTaskDetail, setCaseDetail } = this.props;
      const { list } = lodash.get(advancedQueryOfCase, 'list');
      const stateOfSearch = this.TableSearch.getStateOfSearch();
      const { selectable } = stateOfSearch;

      lodash.set(selectable, 'prev.id', lodash.get(list, `[${rowkey - 1}].procInstId`));
      lodash.set(selectable, 'prev.index', rowkey - 1);
      lodash.set(selectable, 'current.id', record.procInstId);
      lodash.set(selectable, 'current.index', rowkey);
      lodash.set(selectable, 'next.id', lodash.get(list, `[${rowkey + 1}].procInstId`));
      lodash.set(selectable, 'next.index', rowkey + 1);

      if (stateOfSearch) {
        await saveStateOfSearch({ selectable });
      }

      await getTaskDetail({
        taskId: record.taskId,
        processInstanceId: record.caseNo || record.procInstId || record.processInstanceId,
      });
      await setCaseDetail({ ...record });
    }
  };

  getSelectedRowClassName = (record, i) => {
    const { stateOfSearch, advancedQueryOfCase, getSelectedClassName } = this.props;
    const { list } = lodash.get(advancedQueryOfCase, 'list');
    return getSelectedClassName(list, stateOfSearch, 'procInstId', record, i);
  };

  render() {
    const {
      advancedQueryOfCase,
      loading,
      loadingExportExcel,
      stateOfSearch,
      caseConfig,
      handleBtnReset,
      handleSearchReset,
      handleHeaderCell,
      handleSearchBefore,
      getStoredTable,
      isCapsule,
      searchForm,
    } = this.props;
    const list = lodash.get(advancedQueryOfCase, 'list.list');
    const pagination = lodash.get(advancedQueryOfCase, 'list.pagination');
    return (
      <TableSearch
        advanceQueryType="case"
        onSearch={this.fetchData}
        onExportExcel={this.exportExcel}
        searchDefault={searchForm['1'] || stateOfSearch}
        selectKey="processInstanceId"
        wrappedComponentRef={(c) => {
          this.TableSearch = c;
        }}
      >
        <AdvancedQueryOfCaseInquiry
          config={caseConfig?.inquiryField}
          handleBtnReset={handleBtnReset}
          handleSearchReset={handleSearchReset}
          handleSearchBefore={handleSearchBefore}
          onSearchRef={(inst) => {
            this.search = inst;
          }}
          loading={loading}
          loadingExportExcel={loadingExportExcel}
        />
        <Batch>
          <Batch.Item>
            {({ rows }) => {
              const NullLargerThanTwo = rows.filter((row) => !row.batchNo).length > 1;
              const noBatchNoCount = rows.filter((row) => !row.batchNo).length;
              const differentBatchNoCount = lodash.uniqBy(
                rows.filter((row) => row.batchNo),
                'batchNo'
              ).length;
              // 只有两种情况可以增加batch no：
              // 1、有batchNo的case等于0个, 没有batchNo的多于1个，。
              // 2、有batchNo的case大于等于1个（但是大于1个的话后台会返回错误信息） && 没有batchNo的多于0个。
              const showBtn =
                (differentBatchNoCount === 0 && NullLargerThanTwo) ||
                (differentBatchNoCount >= 1 && noBatchNoCount > 0);

              return (
                showBtn && (
                  <Button onClick={() => this.handleBatchUpdate(rows)}>
                    {formatMessageApi({
                      Label_BPM_Button: 'app.navigator.taskDetail.inquireForm.button.batch-add',
                    })}
                  </Button>
                )
              );
            }}
          </Batch.Item>
          <Batch.Item>
            {({ rows }) => {
              const noBatchNoCount = lodash.uniqBy(
                rows.filter((row) => !row.batchNo),
                'batchNo'
              ).length;
              const differentBatchNoCount = lodash.uniqBy(
                rows.filter((row) => row.batchNo),
                'batchNo'
              ).length;
              // 1、必须都有batchNo
              // 2、不同的batchNo的值，必须大于0

              return (
                noBatchNoCount === 0 &&
                differentBatchNoCount > 0 && (
                  <Button onClick={() => this.handleBatchDelete(rows)}>
                    {formatMessageApi({
                      Label_BPM_Button:
                        'app.navigator.taskDetail.inquireForm.button.batch-deletion',
                    })}
                  </Button>
                )
              );
            }}
          </Batch.Item>
        </Batch>
        <AttachSaleSubChannelData
          pagination={pagination}
          list={list}
          className="advanceQueryCaseTable"
        >
          <Table
            rowKey="procInstId"
            tableId="advanceQueryCaseTable"
            locale={{
              emptyText: <SearchEmpty />,
            }}
            getSelectedRowClassName={this.getSelectedRowClassName}
            onRow={(record, index) => ({
              onClick: () => {
                const selected = this.getSelectedRowClassName(record, index);
                if (!selected) {
                  this.fnOnRowClick(record, index);
                } else if (record.taskStatus !== 'error') {
                  this.fnOnRowClick(record, index);
                  history.push({
                    pathname: `/navigator/case/detail/${record.procInstId}`,
                    query: '?id=' + record.procInstId,
                  });
                }
              },
            })}
            onChange={handleSearchReset}
            handleSearchBefore={handleSearchBefore}
            getStoredTable={getStoredTable}
            loading={loading}
            columns={advancedQueryOfCaseColumns(
              stateOfSearch.orders,
              caseConfig?.resultField,
              handleHeaderCell,
              {
                sortName: searchForm['1']?.sortName,
                sortOrder: searchForm['1']?.sortOrder,
              }
            )}
            scroll={getScrollParams(get(caseConfig, 'resultField'), isCapsule)}
          />
        </AttachSaleSubChannelData>
      </TableSearch>
    );
  }
}

export default AdvancedQueryOfCase;
