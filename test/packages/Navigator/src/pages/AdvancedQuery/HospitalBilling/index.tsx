import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, notification } from 'antd';
import { history } from 'umi';
import lodash, { get } from 'lodash';
import TableSearch, { Table, Batch } from '@/components/TableSearch/FilterInquire';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getScrollParams } from '@/utils/inqueryUtils';
import SwitchDrawerModeHoc from 'navigator/HOC/SwitchDrawerModeHoc';
import advancedQueryOfHospitalBillingColumns from './Columns';
import AdvancedQueryOfHospitalBillingInquiry from './Inquiry';
import SearchEmpty from '../SearchEmpty';
@connect(
  ({
    advancedQueryController,
    advancedQueryOfHospitalBiling,
    loading,
    configController,
    advancedQueryAllForm,
  }: any) => ({
    advancedQueryOfHospitalBiling,
    config: configController.configuration,
    stateOfSearch: advancedQueryController.stateOfSearch,
    loading: loading.effects['advancedQueryOfHospitalBiling/getHospitalBilling'],
    searchObj: advancedQueryController.searchObj,
    hospitalBillingConfig: configController.configuration?.hospitalbilling || {},
    hospitalBillingList: advancedQueryOfHospitalBiling.hospitalBillingList,
    hosBillingStatus: advancedQueryController.hosBillingStatus,
    searchForm: advancedQueryAllForm.searchForm,
  })
)
class AdvancedQueryOfHospitalBiling extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  fetchData = (values = {}) => {
    const { dispatch, stateOfSearch } = this.props;
    const { params } = stateOfSearch;

    dispatch({
      type: 'advancedQueryOfHospitalBiling/getHospitalBilling',
      payload: {
        ...values,
        ...{ offset: 0 },
        params: {
          ...params,
          ...values.params,
        },
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
  };

  fnOnRowClick = (record) => {
    history.push({
      pathname: '/claim/hospital/detail',
      search: `?claimNo=${record.hospitalBatchClaimNo}`
    });
  };

  render() {
    const {
      hospitalBillingList,
      hosBillingStatus,
      loading,
      stateOfSearch,
      hospitalBillingConfig,
      handleBtnReset,
      handleSearchReset,
      isCapsule,
      searchForm,
    } = this.props;

    const list = lodash.get(hospitalBillingList, 'list');

    return (
      <TableSearch
        advanceQueryType="case"
        onSearch={this.fetchData}
        stateOfSearch={searchForm['5'] || stateOfSearch}
        selectKey="processInstanceId"
        wrappedComponentRef={(c) => {
          this.TableSearch = c;
        }}
      >
        <AdvancedQueryOfHospitalBillingInquiry
          config={hospitalBillingConfig?.inquiryField}
          handleBtnReset={handleBtnReset}
          handleSearchReset={handleSearchReset}
          onSearchRef={(inst) => {
            this.search = inst;
          }}
          loading={loading}
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
        <Table
          tableId="advanceQueryHospitalBillingTable"
          onRow={(record) => ({
            onClick: () => {
              fnOnRowClick(record);
            },
          })}
          loading={loading}
          locale={{
            emptyText: <SearchEmpty />,
          }}
          columns={advancedQueryOfHospitalBillingColumns(
            stateOfSearch.orders,
            hospitalBillingConfig?.resultField,
            hosBillingStatus,
            {
              sortName: searchForm['5']?.sortName,
              sortOrder: searchForm['5']?.sortOrder,
            }
          )}
          data={{
            list:
              lodash.isArray(list) &&
              lodash.map(list, (item) => ({
                ...item,
                className: 'advanceQueryHostalBillngTable',
              })),
            pagination: lodash.get(hospitalBillingList, 'pagination'),
          }}
          scroll={getScrollParams(get(hospitalBillingConfig, 'resultField'), isCapsule)}
        />
      </TableSearch>
    );
  }
}

export default SwitchDrawerModeHoc(AdvancedQueryOfHospitalBiling);
