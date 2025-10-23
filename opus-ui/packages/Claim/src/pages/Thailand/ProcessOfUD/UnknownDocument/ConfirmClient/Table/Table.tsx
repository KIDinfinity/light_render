import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Table } from 'antd';
import Columns from './Columns';

interface IProps {
  dispatch: Dispatch;
  searchResult: any[];
  searchResultRowKeys: any;
}

@connect(({ claimEditable }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
}))
class TableSearch extends Component<IProps> {
  onChange = (selectedRowKeys: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'UnknownDocumentController/saveSearchResultRowKeys',
      payload: {
        selectedRowKeys,
      },
    });
  };

  render() {
    const { searchResult, searchResultRowKeys, taskNotEditable } = this.props;
    return (
      <Table
        rowKey="id"
        rowSelection={{
          selectedRowKeys: searchResultRowKeys,
          onChange: this.onChange,
          getCheckboxProps: (record: any) => ({
            disabled: record.disabled || taskNotEditable,
          }),
        }}
        scroll={{ x: true }}
        columns={Columns}
        dataSource={searchResult}
        pagination={false}
      />
    );
  }
}

export default connect(({ UnknownDocumentController }: any) => ({
  searchResult: UnknownDocumentController.searchResult || [],
  searchResultRowKeys: UnknownDocumentController.searchResultRowKeys,
}))(TableSearch);
