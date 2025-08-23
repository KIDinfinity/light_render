import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Spin } from 'antd';
import lodash from 'lodash';
import { tableRenderFn, getSortOrderStr } from 'navigator/pages/ReportCenter/_utils/utils';
import styles from './mainCtn.less';

interface IProps {
  dispatch: Dispatch;
  form: any;
  reportList: any[];
  reportData: any;
  activeTabKey: string;
  switchTabLoading: boolean;
  tableDataLoding: boolean;
}


@connect(({ reportCenterOldController, loading }) => ({
  form: reportCenterOldController.form,
  reportList: reportCenterOldController.reportList,
  reportData: reportCenterOldController.reportData,
  activeTabKey: reportCenterOldController.activeTabKey,
  switchTabLoading: reportCenterOldController.switchTabLoading,
  tableDataLoding: loading.effects['reportCenterOldController/search'],
}))
class MainCtn extends Component<IProps> {

  onChangeTable = async (page: any, _: any, sorter: any) => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'reportCenterOldController/changeTable',
      payload: {
        page,
        sorter,
      }
    });
  }

  render() {
    const { reportList, reportData, activeTabKey, switchTabLoading, tableDataLoding } = this.props;
    const curReportData = lodash.get(reportData, `${activeTabKey}`, {});
    const headers = lodash.get(curReportData, 'rows[0].headers', []);
    const data = lodash.get(curReportData, 'rows[0].data', []);
    const {
      currentPage = 1,
      total = 0,
      pageSize = 10,
      sortName,
      sortOrder,
    } = lodash.pick(curReportData, ['currentPage', 'total', 'pageSize', 'sortName', 'sortOrder']);
    const columns = lodash.map(headers, (item: any) => {
      const obj = {
        title: item.columnTitle,
        dataIndex: item.entityField,
        sorter: item.sortColumn,
        render: (text: any) => tableRenderFn(item.render, text),
      }
      if (item.sortColumn === sortName) {
        obj.sortOrder = getSortOrderStr(sortOrder);
      }
      return obj;
    });
    return (
      <div className={styles.mainCtn}>
        {
          lodash.map(reportList, (item: any, idx: number) => (
            columns.length && lodash.isArray(data) ?
              <Table
                key={idx}
                style={{
                  display: (item.reportId === activeTabKey ? 'block' : 'none')
                }}
                columns={columns}
                dataSource={data}
                pagination={{
                  current: currentPage,
                  total,
                  showSizeChanger: true,
                  pageSize,
                }}
                onChange={this.onChangeTable}
                loading={tableDataLoding}
              /> : null
          ))
        }
        {
          !activeTabKey ?
            <div className="tip">
              <div className="tipText">Please Choose Report...</div>
            </div> : null
        }
        {
          switchTabLoading ? <Spin className="loadingWrapper" /> : null
        }
      </div>
    )
  }
}

export default MainCtn;
