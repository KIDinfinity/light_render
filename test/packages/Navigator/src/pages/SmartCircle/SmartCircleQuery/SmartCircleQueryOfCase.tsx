import React, { Component } from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { List, Row, Col, Divider } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './SmartCircleQueryOf.less';
import StyledDivider from './SmartCircleQueryOfStyledDivider';

@connect(({ workspaceAI, loading }) => ({
  queryListOfCase: workspaceAI.queryListOfCase,
  searchValue: workspaceAI.searchValue,
  loadingOfQueryListOfCase: loading.effects['workspaceAI/queryListOfCase'],
  showLengthOfCase: workspaceAI.showLengthOfCase,
}))
class SmartCircleQueryOfCase extends Component {
  handleClick = ({ procInstId }) => {
    if (procInstId) {
      history.push(`/navigator/case/detail/${procInstId}`);
    }
  };

  handleMore = async () => {
    const { searchValue, queryListOfCase, dispatch } = this.props;
    const params = {
      processInstanceId: searchValue,
    };
    if ((queryListOfCase?.rows || []).some((item) => item.inquiryBusinessNo === searchValue)) {
      params.inquiryBusinessNo = searchValue;
      delete params.processInstanceId;
    }
    await dispatch({
      type: 'advancedQueryController/enter',
      payload: {
        tabIndex: '1',
        stateOfSearch: {
          params,
        },
      },
    });
    await dispatch({
      type: 'advancedQueryAllForm/saveCurrentTab',
      payload: {
        currentTab: '1',
      },
    });

  };

  render() {
    const { queryListOfCase, loadingOfQueryListOfCase, showLengthOfCase } = this.props;

    return queryListOfCase?.rows?.length ? (
      <div className={styles.wrapper}>
        <StyledDivider>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.inquire.tab.case',
          })}
        </StyledDivider>
        <List
          itemLayout="horizontal"
          dataSource={queryListOfCase?.rows?.filter?.((item, i) => i < showLengthOfCase)}
          renderItem={(item) => (
            <List.Item key={item.title}>
              <div
                key={item.processInstanceId}
                className={styles.item}
                onClick={() => this.handleClick(item)}
              >
                <div className={`${styles.leftBar} ${styles.caseBar}`}>
                  <span className={`${styles.toDoList} ${styles.case}`} />
                </div>
                <div className={styles.rightBar}>
                  <div className={styles.activityName}>
                    {formatMessageApi({ Label_BPM_CaseCategory: item.caseCategory })}
                  </div>
                  <Divider className={styles.divider} />
                  <Row>
                    <Col>
                      {formatMessageApi({
                        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
                      })}
                      {': '}
                      {item.procInstId}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {formatMessageApi({
                        Label_COM_General: 'BusinessNo',
                      })}
                      {': '}
                      {item.inquiryBusinessNo}
                    </Col>
                  </Row>
                  <div className={styles.itemName}>{item.insured || ''}</div>
                </div>
              </div>
            </List.Item>
          )}
          loading={loadingOfQueryListOfCase}
        />

        {queryListOfCase.total > showLengthOfCase && (
          <div className={styles.moreWrapper}>
            <a className={styles.more} onClick={() => this.handleMore()}>
              {formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.drawer.aiCircle.label.more',
              })}
              &gt;
            </a>
          </div>
        )}
      </div>
    ) : (
      ''
    );
  }
}

export default SmartCircleQueryOfCase;
