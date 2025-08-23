import React from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Spin } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SearchField from '../SearchField';
import SearchFilter from '../SearchFilter';
import styles from './index.less';

interface IProps {
  dispatch: Dispatch;
  tab: any;
  configuration: any;
  reportListMap: any;
  activeTabKey: string;
  reportData: any;
  reportCode: string;
  functionLoading: boolean;
}

class TabItem extends React.Component<IProps> {
  get getReportName() {
    const { tab } = this.props;
    const transName = formatMessageApi({ Label_COM_ReportCenter: tab?.reportCode });
    if (transName === tab?.reportCode) {
      return tab?.reportName;
    }
    return transName;
  }

  switchTabFn = async (reportCode: string) => {
    const { dispatch, activeTabKey } = this.props;
    dispatch({
      type: 'reportCenterController/saveClickTab',
      payload: {
        clickdTab: true,
      },
    });
    if (activeTabKey !== reportCode) {
      dispatch({
        type: 'reportCenterController/saveStatisticCodeList',
        payload: { statisticCodeList: [] },
      });
      dispatch({
        type: 'reportCenterController/changeTableSwitch',
        payload: { isPrintTable: true },
      });
      await dispatch({
        type: 'reportCenterController/saveActiveTabInfo',
        payload: {
          activeTabKey: reportCode,
        },
      });
      await dispatch({
        type: 'reportCenterController/findReportMetadata',
        payload: {
          state: {
            reportCode,
          },
        },
      });
    }
    dispatch({ type: 'reportCenterController/clearCovariance' });
  };

  hideTab = (e) => {
    e.stopPropagation();
    const { dispatch, reportCode, reportListMap } = this.props;
    const reports = lodash.cloneDeep(reportListMap);
    reports[reportCode].visible = false;
    dispatch({
      type: 'reportCenterController/saveReportList',
      payload: reports,
    });
  };

  handleSort = (sort: any) => {
    const { dispatch } = this.props;
    const reportListMap = {};
    lodash.forEach(sort, (item) => {
      reportListMap[item.reportCode] = item;
    });
    dispatch({
      type: 'reportCenterController/saveReportList',
      payload: reportListMap,
    });
  };

  render() {
    const { tab, activeTabKey, reportCode, functionLoading, item, index, reportList } = this.props;
    return (
      <div
        id={tab?.reportCode === activeTabKey ? activeTabKey : undefined}
        className={`listItem${tab?.reportCode === activeTabKey ? ' active' : ''}`}
      >
        {/* TODO: hide/show dashboard先不上 */}
        {/* <DnDCard
          key={item.reportCode}
          record={item}
          index={index}
          array={reportList}
          onSort={(sortList: any) => this.handleSort(sortList)}
          config={{
            sortKey: 'sequence',
          }}
          showBtn={false}
          DndCard={false}
        >
          <div className="itemTitle" onClick={() => this.switchTabFn(tab?.reportCode)}>
            {tab?.reportCode !== activeTabKey && (
              <Icon onClick={this.hideTab} type="minus" className="icon-minus" />
            )}
            <div className="text">{this.getReportName}</div>
          </div>
        </DnDCard> */}
        <div className="itemTitle" onClick={() => this.switchTabFn(tab?.reportCode)}>
          <div className="text">{this.getReportName}</div>
        </div>
        {functionLoading && tab?.reportCode === activeTabKey && (
          <div className={styles.emptyBox}>
            <Spin />
          </div>
        )}
        {!functionLoading && tab?.reportCode === activeTabKey && (
          <>
            <div className="searchfilter">
              <SearchFilter reportCode={reportCode} />
              {/* TODO: hide/show dashboard先不上 */}
              {/* <Icon onClick={this.hideTab} type="minus" className="icon-minus" /> */}
            </div>
            <div className="filter">
              <SearchField reportCode={reportCode} />
            </div>
          </>
        )}
      </div>
    );
  }
}

export default connect(({ reportCenterController, loading }: any, { reportCode }: any) => ({
  activeTabKey: reportCenterController.activeTabKey,
  tab: reportCenterController.reportListMap[reportCode],
  functionLoading: loading.effects['reportCenterController/findReportMetadata'],
  reportListMap: reportCenterController.reportListMap,
}))(TabItem);
