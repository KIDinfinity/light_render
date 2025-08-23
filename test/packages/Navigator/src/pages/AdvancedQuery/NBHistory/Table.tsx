import React, { Component } from 'react';
import { connect } from 'dva';
import lodash, { get } from 'lodash';
import { history } from 'umi';
import TableSearch, { Table } from '@/components/TableSearch/FilterInquire';
import { getScrollParams } from '@/utils/inqueryUtils';
import SwitchDrawerModeHoc from 'navigator/HOC/SwitchDrawerModeHoc';
import AttachSaleSubChannelData from 'navigator/utils/attachSaleSubChannelData';
import historyColumns from './Columns';
import AdvancedQueryOfNBHistoryInquiry from './Inquiry';
import { tarckInquiryPoint, eEventName, eEventOperation } from '@/components/TarckPoint';
import SearchEmpty from '../SearchEmpty';

@connect(
  ({
    advancedQueryController,
    workspaceNBHistory,
    loading,
    configController,
    advancedQueryAllForm,
  }: any) => ({
    workspaceNBHistory,
    loading: loading.effects['workspaceNBHistory/list'],
    searchObj: advancedQueryController.searchObj,
    stateOfSearch: advancedQueryController.stateOfSearch,
    nbHistoryConfig: configController.configuration?.nbhistoryinquiry || {},
    searchForm: advancedQueryAllForm.searchForm,
  })
)
class AdvancedQueryOfNBHistory extends Component<any> {
  handleSearch = async (values: any = {}, e: any) => {
    const {
      dispatch,
      getTaskDetail,
      setCaseDetail,
      saveStateOfSearch,
      setTaskId,
      setProcessInstanceId,
    } = this.props;

    const resultData = await dispatch({
      type: 'workspaceNBHistory/list',
      payload: {
        currentPage: 1,
        ...values,
        defaultSortName: 'businessNo',
        sortName: 'businessNo',
        params: {
          ...values.params,
        },
      },
    });
    if (resultData?.rows?.length > 0) {
      const record = resultData?.rows?.[0];
      if (this.TableSearch) {
        const list = resultData?.rows;
        const stateOfSearch = this.TableSearch.getStateOfSearch();
        const { selectable } = stateOfSearch;

        lodash.set(selectable, 'prev.id', null);
        lodash.set(selectable, 'prev.index', null);
        lodash.set(selectable, 'current.id', record?.procInstId);
        lodash.set(selectable, 'current.index', 0);
        lodash.set(selectable, 'next.id', list?.[1]?.procInstId);
        lodash.set(selectable, 'next.index', 1);

        await saveStateOfSearch({ selectable });
      }
      await getTaskDetail({
        taskId: record?.taskId,
        processInstanceId: record?.caseNo || record?.procInstId || record?.processInstanceId,
      });

      await setCaseDetail({ ...record });
      tarckInquiryPoint(dispatch, {
        ...(values.params || {}),
        eventName: eEventName.nbHistory,
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

  handleTableChange = async (values: any = {}) => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'workspaceNBHistory/list',
      payload: {
        ...values,
        defaultSortName: 'businessNo',
        sortName: 'businessNo',
        params: {
          ...values.params,
        },
      },
    });
  };

  fnOnRowClick = async (record: any, rowkey: any) => {
    const { getTaskDetail, setCaseDetail } = this.props;
    if (this.TableSearch) {
      const { saveStateOfSearch, workspaceNBHistory } = this.props;
      const { list } = workspaceNBHistory?.list;
      const stateOfSearch = this.TableSearch.getStateOfSearch();
      const { selectable } = stateOfSearch;

      lodash.set(selectable, 'prev.id', list?.[rowkey - 1]?.procInstId);
      lodash.set(selectable, 'prev.index', rowkey - 1);
      lodash.set(selectable, 'current.id', record.procInstId);
      lodash.set(selectable, 'current.index', rowkey);
      lodash.set(selectable, 'next.id', list?.[rowkey + 1]?.procInstId);
      lodash.set(selectable, 'next.index', rowkey + 1);

      await saveStateOfSearch({ selectable });

      await getTaskDetail({
        taskId: record.taskId,
        processInstanceId: record.caseNo || record.procInstId || record.processInstanceId,
        claimNo: record.inquiryClaimNo,
      });
      await setCaseDetail({ ...record });
    }
  };

  getSelectedRowClassName = (record, i) => {
    const { stateOfSearch, workspaceNBHistory, getSelectedClassName } = this.props;
    const { list } = workspaceNBHistory?.list;
    return getSelectedClassName(list, stateOfSearch, 'procInstId', record, i);
  };

  render() {
    const {
      workspaceNBHistory,
      loading,
      stateOfSearch,
      nbHistoryConfig,
      handleBtnReset,
      handleSearchReset,
      isCapsule,
      searchForm,
    } = this.props;
    return (
      <TableSearch
        onSearch={this.handleSearch}
        stateOfSearch={searchForm['9'] || stateOfSearch}
        advanceQueryType="claim_history"
        wrappedComponentRef={(c) => {
          this.TableSearch = c;
        }}
        searchDefault={searchForm['9'] || {}}
      >
        <AdvancedQueryOfNBHistoryInquiry
          handleSearchReset={handleSearchReset}
          handleSearchBefore={this.handleSearchBefore}
          handleBtnReset={handleBtnReset}
          stateOfSearch={stateOfSearch}
          config={nbHistoryConfig.inquiryField}
          loading={loading}
        />
        <AttachSaleSubChannelData {...workspaceNBHistory?.list}>
          <Table
            rowKey="key"
            loading={loading}
            locale={{
              emptyText: <SearchEmpty />,
            }}
            columns={historyColumns(
              workspaceNBHistory.caseCategory,
              stateOfSearch.orders,
              nbHistoryConfig?.resultField,
              {
                sortName: searchForm['9']?.sortName,
                sortOrder: searchForm['9']?.sortOrder,
              }
            )}
            getSelectedRowClassName={this.getSelectedRowClassName}
            onChange={handleSearchReset}
            onRow={(record, rowKey) => ({
              onClick: () => {
                const selected = this.getSelectedRowClassName(record, rowKey);
                if (!selected) {
                  this.fnOnRowClick(record, rowKey);
                } else if (record.taskStatus !== 'error') {
                  this.fnOnRowClick(record, rowKey);
                  history.push({
                    pathname: `/nb/history/${record?.businessNo}/${record?.procInstId}`,
                  });
                }
              },
            })}
            scroll={getScrollParams(get(nbHistoryConfig, 'resultField'), isCapsule)}
            handleSearch={this.handleTableChange}
          />
        </AttachSaleSubChannelData>
      </TableSearch>
    );
  }
}

export default SwitchDrawerModeHoc(AdvancedQueryOfNBHistory);
