import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Table } from 'antd';
import Columns from './Columns';

interface IProps {
  dispatch: Dispatch;
  claimHistorySearchResult: any[];
  claimHistorySearchResultRowKeys: string[];
}

@connect(({ claimEditable }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
}))
class TableSearch extends Component<IProps> {
  onChange = (selectedRowKeys: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'UnknownDocumentController/saveClaimHistorySearchResultRowKeys',
      payload: {
        selectedRowKeys,
      },
    });
  };

  render() {
    const {
      claimHistorySearchResult,
      claimHistorySearchResultRowKeys,
      taskNotEditable,
    } = this.props;
    return (
      <Table
        rowKey="caseNo"
        rowSelection={{
          selectedRowKeys: claimHistorySearchResultRowKeys,
          onChange: this.onChange,
          getCheckboxProps: (record) => ({
            disabled: record.disabled || taskNotEditable,
          }),
        }}
        scroll={{ x: true }}
        columns={Columns}
        dataSource={claimHistorySearchResult}
        pagination={false}
      />
    );
  }
}

export default connect(({ UnknownDocumentController }: any) => ({
  claimHistorySearchResult: UnknownDocumentController.claimHistorySearchResult || [],
  claimHistorySearchResultRowKeys: UnknownDocumentController.claimHistorySearchResultRowKeys,
}))(TableSearch);
