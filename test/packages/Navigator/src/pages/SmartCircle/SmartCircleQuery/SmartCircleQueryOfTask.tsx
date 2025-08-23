import React, { Component } from 'react';
import { connect } from 'dva';
import { List, Row, Col, Divider } from 'antd';
import { handleInError } from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './SmartCircleQueryOfTask.less';
import StyledDivider from './SmartCircleQueryOfStyledDivider';

@connect(({ workspaceAI, loading, user }) => ({
  queryListOfTask: workspaceAI.queryListOfTask,
  searchValue: workspaceAI.searchValue,
  loadingOfQueryListOfTask: loading.effects['workspaceAI/queryListOfTask'],
  showLengthOfTask: workspaceAI.showLengthOfTask,
  userId: user.currentUser.userId,
}))
class SmartCircleQueryOfTask extends Component {
  handleClick = ({ taskId, assignee, taskDefKey }) => {
    const { dispatch } = this.props;
    // 如果Assignee不是自己，就不让跳转，提示没有权限
    dispatch({
      type: 'global/visitTaskDetail',
      payload: { taskId, assignee, taskDefKey, reload: false },
    });
  };

  handleMore = async () => {
    const { searchValue, queryListOfTask, dispatch } = this.props;
    const params = {
      processInstanceId: searchValue,
      taskStatus: ['todo', 'pending'],
    };
    if ((queryListOfTask?.rows || []).some((item) => item.inquiryBusinessNo === searchValue)) {
      params.inquiryBusinessNo = searchValue;
      delete params.processInstanceId;
    }
    await dispatch({
      type: 'advancedQueryController/enter',
      payload: {
        tabIndex: '2',
        stateOfSearch: {
          params,
        },
      },
    });
    await dispatch({
      type: 'advancedQueryAllForm/saveCurrentTab',
      payload: {
        currentTab: '2',
      },
    });
  };

  render() {
    const { queryListOfTask, loadingOfQueryListOfTask, showLengthOfTask } = this.props;
    const dataSource = queryListOfTask?.rows;
    const queryListOfTotal = queryListOfTask?.total;

    return dataSource?.length ? (
      <div className={styles.wrapper}>
        <StyledDivider>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.tab.task',
          })}
        </StyledDivider>
        <List
          itemLayout="horizontal"
          dataSource={dataSource.filter((item, i) => i < showLengthOfTask)}
          renderItem={(item) => (
            <List.Item key={item.title}>
              {item.taskStatus?.toLowerCase() !== 'completed' && (
                <div
                  key={item.taskId}
                  className={`${styles.item} ${
                    item.taskStatus?.toLowerCase() === 'error' ? styles.inError : ''
                  }`}
                  onClick={
                    item.taskStatus?.toLowerCase() === 'error'
                      ? handleInError
                      : () => this.handleClick(item)
                  }
                >
                  <div
                    className={`${styles.leftBar} ${
                      item.taskStatus?.toLowerCase() === 'todo' ? styles.toDo : ''
                    }`}
                  >
                    {item.taskStatus?.toLowerCase() === 'todo' && (
                      <span className={styles.toDoList} />
                    )}
                    {item.taskStatus?.toLowerCase() === 'pending' && (
                      <span className={styles.pending} />
                    )}
                  </div>
                  <div className={styles.rightBar}>
                    <div className={styles.activityName}>
                      {formatMessageApi({ activity: item.activityKey })}
                    </div>
                    <Divider className={styles.divider} />
                    <Row type="flex" gutter={16} justify="space-between">
                      <Col className={styles.assignee}>
                        {formatMessageApi({
                          Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.assignee',
                        })}
                        {': '}
                        {item?.assigneeName || item?.assignee ||''}
                      </Col>
                    </Row>
                    <Row>
                      <Col className={styles.assigneeNo}>
                        {formatMessageApi({
                          Label_BIZ_Claim:
                            'app.navigator.task-detail-of-data-capture.label.case-no',
                        })}
                        {': '}
                        {item?.procInstId}
                      </Col>
                    </Row>
                    <Row>
                      <Col className={styles.assigneeNo}>
                        {formatMessageApi({
                          Label_COM_General: 'BusinessNo',
                        })}
                        {': '}
                        {item.inquiryBusinessNo}
                      </Col>
                    </Row>
                  </div>
                </div>
              )}
            </List.Item>
          )}
          loading={loadingOfQueryListOfTask}
        />
        {queryListOfTotal > showLengthOfTask && (
          <div className={styles.moreWrapper}>
            <a className={styles.more} onClick={() => this.handleMore()}>
              {formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.drawer.aiCircle.label.more',
              })}{' '}
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

export default SmartCircleQueryOfTask;
