import React, { Component } from 'react';
import { connect } from 'dva';
import { isEmpty } from 'lodash';
import Header from './Header';
import SlideBar from './SlideBar';
import Content from './Content';
import styles from './index.less';
import PreviewModal from './Model/PreviewModal';
import { history } from 'umi';
import queryString from 'query-string';
interface IProps {
  dispatch: any;
  location: any;
}

@connect()
class ReportCenter extends Component<IProps> {
  async componentDidMount() {
    const {
      dispatch,
      location: { query },
    } = this.props;
    dispatch({
      type: 'global/changeLayoutHeader',
      payload: {
        isShowHeader: false,
      },
    });
    dispatch({
      type: 'reportCenterController/getListReports',
      callback: () => {
        if (!isEmpty(query)) {
          document.getElementById(query?.linkedReportCode)?.scrollIntoView();
        }
      },
    });

    if (!isEmpty(query)) {
      console.log('query', query);
      await dispatch({
        type: 'reportCenterController/saveActiveTabInfo',
        payload: {
          activeTabKey: query?.linkedReportCode || '',
        },
      });
      dispatch({
        type: 'reportCenterController/findReportMetadata',
        payload: {
          reportCode: query?.linkedReportCode || '',
          params: query?.searchFields,
        },
      });
    }
    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: ['Dropdown_CFG_StatisticType'],
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/changeLayoutHeader',
      payload: {
        isShowHeader: true,
      },
    });
    dispatch({
      type: 'reportCenterController/clear',
    });
  }

  render() {
    return (
      <div className={styles.report}>
        <Header />
        <div className={styles.main}>
          <SlideBar />
          <Content />
          <PreviewModal />
        </div>
      </div>
    );
  }
}

export default (props) => {
  const query = queryString.parse(history.location.search);

  return <ReportCenter {...props} location={{ query }} />;
};
