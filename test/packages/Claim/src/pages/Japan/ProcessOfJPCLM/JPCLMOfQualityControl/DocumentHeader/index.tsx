import React, { Component } from 'react';
import { Tabs as AntTabs } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DocumentList from './DocumentList';
import DocumentDate from './DocumentDate';

const { TabPane } = AntTabs;

interface IProps {
  dispatch: Dispatch;
  applicationList: any[];
  taskDetail: any;
}

class Tabs extends Component<IProps> {
  onChange = (currentTab: string) => {
    const { dispatch } = this.props;
    dispatch({
      type: `JPCLMOfQualityController/saveCurrentTab`,
      payload: currentTab,
    });
  };

  getTabTitle = (applicationNo: string): string => {
    return `${formatMessageApi({
      Label_BIZ_Claim: 'venus_claim.label.applicationNo',
    })} ${applicationNo}`;
  };

  render() {
    const { applicationList = [] } = this.props;
    return (
      <div className={styles.Header}>
        <AntTabs onChange={this.onChange} type="card">
          {lodash.map(applicationList, (pane) => (
            <TabPane
              tab={
                <div data-error-scroll-enter-1={pane.applicationNo}>
                  {this.getTabTitle(pane.applicationNo)}
                </div>
              }
              key={pane.applicationNo}
              forceRender
              className={styles.panel}
            >
              <DocumentDate applicationNo={pane.applicationNo} />
              <div data-error-scroll-content-1={pane.applicationNo}>
                <DocumentList
                  applicationNo={pane.applicationNo}
                  taskDetail={this.props.taskDetail}
                />
              </div>
            </TabPane>
          ))}
        </AntTabs>
      </div>
    );
  }
}

export default connect(({ JPCLMOfQualityController }: any) => ({
  applicationList: JPCLMOfQualityController.applicationList,
}))(Tabs);
