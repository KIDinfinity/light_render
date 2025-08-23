import React, { Component } from 'react';
import { connect } from 'dva';
import lodash, { get } from 'lodash';
import { history } from 'umi';
import { LS, LSKey } from '@/utils/cache';
import TableSearch, { Table } from '@/components/TableSearch/FilterInquire';
import { getScrollParams } from '@/utils/inqueryUtils';
// eslint-disable-next-line import/no-unresolved
import { tenant, Region } from '@/components/Tenant';
import SwitchDrawerModeHoc from 'navigator/HOC/SwitchDrawerModeHoc';
import historyColumns from './Columns';
import AdvancedQueryOfPOSHistoryInquiry from './Inquiry';
import { tarckInquiryPoint, eEventName, eEventOperation } from '@/components/TarckPoint';
import SearchEmpty from '../SearchEmpty';

@connect(
  ({
    advancedQueryController,
    workspaceServicingHistory,
    loading,
    configController,
    advancedQueryAllForm,
  }: any) => ({
    list: workspaceServicingHistory?.list,
    loading: loading.effects['workspaceServicingHistory/list'],
    searchObj: advancedQueryController.searchObj,
    stateOfSearch: advancedQueryController.stateOfSearch,
    servicingHistoryConfig: configController.configuration?.servicinghistory || {},
    searchForm: advancedQueryAllForm.searchForm,
  })
)
class AdvancedQueryOfPOSHistory extends Component<any> {
  TableSearch: any;

  onSearch = async (values: any = {}, e: any) => {
    const { dispatch } = this.props;

    await dispatch({
      type: 'workspaceServicingHistory/save',
      payload: {},
    });

    const userInfo = LS.getItem(LSKey.CURRENTUSER);
    const extra = tenant.region() === Region.MY ? { companyCode: userInfo?.companyCode?.[0] } : {};

    const resultData = await dispatch({
      type: 'workspaceServicingHistory/list',
      payload: {
        ...values,
        params: {
          ...extra,
          ...values.params,
        },
      },
    });
    if (resultData?.rows?.length > 0) {
      tarckInquiryPoint(dispatch, {
        ...(values.params || {}),
        eventName: eEventName.posHistory,
        eventOperation: eEventOperation.search,
      });
    }
  };

  fnOnRowClick = async (record: any, rowkey: any) => {
    const { dispatch, getTaskDetail, setCaseDetail } = this.props;

    if (this.TableSearch) {
      const { saveStateOfSearch, list } = this.props;
      const stateOfSearch = this.TableSearch.getStateOfSearch();
      const { selectable } = stateOfSearch;

      lodash.set(selectable, 'prev.id', list?.[rowkey - 1]?.caseNo);
      lodash.set(selectable, 'prev.index', rowkey - 1);
      lodash.set(selectable, 'current.id', record.caseNo);
      lodash.set(selectable, 'current.index', rowkey);
      lodash.set(selectable, 'next.id', list?.[rowkey + 1]?.caseNo);
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

  getSelectedRowClassName = (record: any, i: any) => {
    const { stateOfSearch, list, getSelectedClassName } = this.props;

    return getSelectedClassName(list?.list, stateOfSearch, 'caseNo', record, i);
  };

  render() {
    const {
      list,
      loading,
      stateOfSearch,
      servicingHistoryConfig,
      handleBtnReset,
      handleSearchReset,
      isCapsule,
      searchForm,
    } = this.props;
    return (
      <TableSearch
        onSearch={this.onSearch}
        stateOfSearch={searchForm['8'] || stateOfSearch}
        wrappedComponentRef={(c: any) => {
          this.TableSearch = c;
        }}
      >
        <AdvancedQueryOfPOSHistoryInquiry
          handleSearchReset={handleSearchReset}
          handleBtnReset={handleBtnReset}
          stateOfSearch={stateOfSearch}
          config={servicingHistoryConfig.inquiryField}
          loading={loading}
        />
        {/**
        // @ts-ignore  */}
        <Table
          rowKey="businessNo" // insuredId
          loading={loading}
          locale={{
            emptyText: <SearchEmpty />,
          }}
          columns={historyColumns(stateOfSearch.orders, servicingHistoryConfig?.resultField, {
            sortName: searchForm['8']?.sortName,
            sortOrder: searchForm['8']?.sortOrder,
          })}
          data={list}
          getSelectedRowClassName={this.getSelectedRowClassName}
          onChange={handleSearchReset}
          onRow={(record: any, rowKey) => ({
            onClick: () => {
              const selected = this.getSelectedRowClassName(record, rowKey);
              if (!selected) {
                this.fnOnRowClick(record, rowKey);
              } else {
                this.fnOnRowClick(record, rowKey);
                history.push({
                  pathname: `/servicing/history/${record.caseCategory}/${record.businessNo}`,
                });
              }
            },
          })}
          scroll={getScrollParams(get(servicingHistoryConfig, 'resultField'), isCapsule)}
          handleSearch={this.onSearch}
        />
      </TableSearch>
    );
  }
}

export default SwitchDrawerModeHoc(AdvancedQueryOfPOSHistory);
