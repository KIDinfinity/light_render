import React, { Component } from 'react';
import { connect } from 'dva';
import lodash, { get } from 'lodash';
import { history } from 'umi';
import TableSearch, { Table } from '@/components/TableSearch/FilterInquire';
import { getScrollParams } from '@/utils/inqueryUtils';
import SwitchDrawerModeHoc from 'navigator/HOC/SwitchDrawerModeHoc';
import AttachSaleSubChannelData from 'navigator/utils/attachSaleSubChannelData';
import historyColumns from './Columns';
import AdvancedQueryOfClaimHistoryInquiry from './Inquiry';
import { tarckInquiryPoint, eEventName, eEventOperation } from '@/components/TarckPoint';
import { handleMessageModal } from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SearchEmpty from '../SearchEmpty';
@connect(
  ({
    advancedQueryController,
    workspaceHistory,
    loading,
    configController,
    advancedQueryAllForm,
  }: any) => ({
    workspaceHistory,
    loading: loading.effects['workspaceHistory/list'],
    loadingExportExcel: loading.effects['workspaceHistory/exportExcel'],
    searchObj: advancedQueryController.searchObj,
    stateOfSearch: advancedQueryController.stateOfSearch,
    claimHistoryConfig: configController.configuration?.claimhistory || {},
    inited: workspaceHistory.inited,
    searchForm: advancedQueryAllForm.searchForm,
  })
)
class AdvancedQueryOfClaimHistory extends Component<any> {
  onSearch = async (values: any = {}, e: any) => {
    const { dispatch } = this.props;
    const resultData = await dispatch({
      type: 'workspaceHistory/list',
      payload: {
        ...values,
        params: {
          // ...params,
          ...values.params,
        },
      },
    });
    if (resultData?.rows?.length > 0) {
      tarckInquiryPoint(dispatch, {
        ...(values.params || {}),
        eventName: eEventName.claimHistory,
        eventOperation: eEventOperation.search,
      });
    } else {
      dispatch({
        type: 'navigatorInformationController/clear',
      });
    }
  };

  handleSearchBefore = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'workspaceHistory/updateInit',
      payload: {
        inited: true,
      },
    });
  };

  fnOnRowClick = async (record: any, rowkey: any) => {
    const { dispatch } = this.props;

    if (this.TableSearch) {
      const { saveStateOfSearch, workspaceHistory, getTaskDetail, setCaseDetail } = this.props;
      const { list } = workspaceHistory?.list;
      const stateOfSearch = this.TableSearch.getStateOfSearch();
      const { selectable } = stateOfSearch;

      lodash.set(selectable, 'prev.id', list?.[rowkey - 1]?.claimNo);
      lodash.set(selectable, 'prev.index', rowkey - 1);
      lodash.set(selectable, 'current.id', record.claimNo);
      lodash.set(selectable, 'current.index', rowkey);
      lodash.set(selectable, 'next.id', list?.[rowkey + 1]?.claimNo);
      lodash.set(selectable, 'next.index', rowkey + 1);

      await saveStateOfSearch({ ...stateOfSearch, selectable });

      await getTaskDetail({
        taskId: record.taskId,
        processInstanceId: record.caseNo || record.procInstId || record.processInstanceId,
        claimNo: record.claimNo,
      });
      await setCaseDetail({ ...record });
    }
  };

  getSelectedRowClassName = (record, i) => {
    const { stateOfSearch, workspaceHistory, getSelectedClassName } = this.props;
    const { list } = workspaceHistory?.list;

    return getSelectedClassName(list, stateOfSearch, 'claimNo', record, i);
  };

  exportExcel = async (values = {}) => {
    const { dispatch, stateOfSearch } = this.props;
    if (!lodash.some(lodash.values(values.params), (item) => !lodash.isEmpty(item))) {
      handleMessageModal([{ content: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000393' }) }]);
      return;
    }
    const resultData = await dispatch({
      type: 'workspaceHistory/exportExcel',
      payload: {
        ...values,
      },
    });
  };

  render() {
    const {
      workspaceHistory,
      loading,
      stateOfSearch,
      claimHistoryConfig,
      handleBtnReset,
      handleSearchReset,
      isCapsule,
      searchForm,
    } = this.props;

    return (
      <TableSearch
        onSearch={this.onSearch}
        onExportExcel={this.exportExcel}
        stateOfSearch={searchForm['4'] || stateOfSearch}
        advanceQueryType="claim_history"
        wrappedComponentRef={(c) => {
          this.TableSearch = c;
        }}
      >
        <AdvancedQueryOfClaimHistoryInquiry
          handleSearchReset={handleSearchReset}
          handleSearchBefore={this.handleSearchBefore}
          handleBtnReset={handleBtnReset}
          stateOfSearch={stateOfSearch}
          config={claimHistoryConfig.inquiryField}
          loading={loading}
        />
        <AttachSaleSubChannelData {...workspaceHistory?.list}>
          <Table
            rowKey="inquiryClaimNo" // insuredId
            loading={loading}
            columns={historyColumns(stateOfSearch.orders, claimHistoryConfig?.resultField, {
              sortName: searchForm['4']?.sortName,
              sortOrder: searchForm['4']?.sortOrder,
            })}
            locale={{
              emptyText: <SearchEmpty />,
            }}
            getSelectedRowClassName={this.getSelectedRowClassName}
            onChange={handleSearchReset}
            onRow={(record, rowKey) => ({
              onClick: () => {
                const selected = this.getSelectedRowClassName(record, rowKey);
                if (!selected) {
                  this.fnOnRowClick(record, rowKey);
                } else if (record.taskStatus !== 'error') {
                  history.push({
                    pathname: '/claim/history',
                    search: `?caseCategory=${record.caseCategory}&claimNo=${record.claimNo}&partyId=${record.partyId}&customerType=${record.customerType}&businessNo=${record.claimNo}`
                  });
                }
              },
            })}
            scroll={getScrollParams(get(claimHistoryConfig, 'resultField'), isCapsule)}
            handleSearch={this.onSearch}
          />
        </AttachSaleSubChannelData>
      </TableSearch>
    );
  }
}

export default SwitchDrawerModeHoc(AdvancedQueryOfClaimHistory);
