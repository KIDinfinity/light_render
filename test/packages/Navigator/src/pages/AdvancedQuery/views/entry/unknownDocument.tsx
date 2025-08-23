import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, notification } from 'antd';
import lodash, { get } from 'lodash';
import TableSearch, { Table, Batch } from '@/components/TableSearch/FilterInquire';
import SwitchDrawerModeHoc from 'navigator/HOC/SwitchDrawerModeHoc';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getScrollParams } from '@/utils/inqueryUtils';
import { UnknownDocumentColumns } from '../columns';
import { UnknownDocumentInquire } from '../inquire';
import { namespace } from '../../_models';
import SearchEmpty from '../../SearchEmpty';

interface ISProps {
  dispatch: any;
  stateOfSearch: any;
}

class EntryUnknownDocument extends Component<ISProps> {
  search: any;

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  // eslint-disable-next-line  react/no-deprecated
  componentWillMount = async () => {
    const { dispatch } = this.props;

    // 获取caseCategory字典
    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: ['Label_DOC_Document', 'Dropdown_CFG_DocumentType'],
    });
  };

  fetchData = (values: any = {}) => {
    const { dispatch, stateOfSearch } = this.props;
    const { params } = stateOfSearch;
    dispatch({
      type: `${namespace}/getUnknownDocList`,
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

  handleBatchUpdate = async (rows: any) => {
    const { dispatch } = this.props;

    const response = await dispatch({
      type: 'batchProcess/bundleToBatchProcess',
      payload: lodash.map(rows, (row: any) => ({
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

  render() {
    const {
      loading,
      stateOfSearch,
      inquiryField,
      resultField,
      unKnownDocList,
      handleBtnReset,
      handleSearchReset,
      isCapsule,
      searchForm,
    }: any = this.props;

    return (
      <TableSearch
        advanceQueryType="case"
        onSearch={this.fetchData}
        stateOfSearch={searchForm['6'] || stateOfSearch}
        selectKey="processInstanceId"
        wrappedComponentRef={(c: any) => {
          this.TableSearch = c;
        }}
      >
        <UnknownDocumentInquire
          config={inquiryField}
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
          rowKey="id"
          tableId="advanceQueryUnknownDocument"
          loading={loading}
          locale={{
            emptyText: <SearchEmpty />,
          }}
          columns={UnknownDocumentColumns(stateOfSearch.orders, resultField, {
            sortName: searchForm['6']?.sortName,
            sortOrder: searchForm['6']?.sortOrder,
          })}
          data={{
            list:
              lodash.isArray(unKnownDocList.list) &&
              lodash.map(unKnownDocList.list, (item) => ({
                ...item,
                className: 'advanceQueryUnknownDocumentTable',
              })),
            pagination: unKnownDocList.pagination,
          }}
          scroll={getScrollParams(resultField, isCapsule, undefined, 7)}
        />
      </TableSearch>
    );
  }
}

export default connect(
  ({
    advancedQueryController,
    NewAdvancedQueryController,
    loading,
    configController,
    advancedQueryAllForm,
  }: any) => ({
    config: configController.configuration,
    stateOfSearch: advancedQueryController.stateOfSearch,
    loading: loading.effects[`${namespace}/getUnknownDocList`],
    searchObj: advancedQueryController.searchObj,
    inquiryField: get(configController, 'configuration.document.inquiryField', []),
    resultField: get(configController, 'configuration.document.resultField', []),
    unKnownDocList: get(NewAdvancedQueryController, 'unKnownDoc', {}),
    searchForm: advancedQueryAllForm.searchForm,
  })
)(SwitchDrawerModeHoc(EntryUnknownDocument));
