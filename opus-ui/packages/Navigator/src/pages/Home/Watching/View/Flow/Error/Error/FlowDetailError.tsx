import React, { Component } from 'react';
import lodash from 'lodash';
import moment from 'moment';
import { Icon } from 'antd';
import { connect } from 'dva';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as ErrorIcon } from 'navigator/assets/error.svg';
import handlingPng from 'navigator/assets/handling.svg';
import styles from './FlowDetailError.less';

@connect(({ flowDetailError }) => ({
  flowDetailError,
}))
class FlowDetailError extends Component {
  state = {
    height: window.innerHeight,
  };

  componentDidMount = () => {
    window.addEventListener('resize', this.setHeight);
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.setHeight);
    const { dispatch } = this.props;
    // reset the data
    dispatch({
      type: 'flowDetailError/errorTasks',
      payload: [],
    });
  }

  setHeight = () => {
    this.setState({
      height: window.innerHeight,
    });
  };

  nextPage = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'flowDetailError/nextPage',
      payload: {},
    });
  };

  prePage = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'flowDetailError/prePage',
      payload: {},
    });
  };

  render() {
    const { page, errorTasks } = this.props.flowDetailError;
    const showTask = this.state.height > 700 ? 3 : 2;
    const mixHeight = this.state.height < 701;
    const errorTasksGroup = lodash.chunk(errorTasks, showTask); // diplay a group of 3
    const errorTasksData = errorTasksGroup[page];
    const addHight = this.state.height > 700 ? '20vh' : '';
    return (
      <div
        className={classNames(
          styles.flowDetailErrorWrapper,
          mixHeight ? styles.minFlowDetailErrorWrapper : ''
        )}
        style={{ minHeight: addHight }}
      >
        <Icon
          type="left"
          onClick={this.prePage}
          className={styles.leftArrow}
          style={{ display: page === 0 ? 'none' : 'block' }}
        />
        <Icon
          type="right"
          onClick={this.nextPage}
          className={styles.rightArrow}
          style={{
            display:
              errorTasksGroup.length <= 0 || page === errorTasksGroup.length - 1 ? 'none' : 'block',
          }}
        />
        <div className={styles.errorHeader}>
          <Icon component={ErrorIcon} className={styles.errorPng} />
          <span className={styles.errorNum}>
            {formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.index.mode.flow.detail.error',
            })}
            {': '}
            {errorTasks.length}
          </span>
        </div>
        <div className={styles.errorContainer}>
          {Array.isArray(errorTasksData) && errorTasksData.length > 0
            ? lodash.map(errorTasksData, (item) => (
                <div className={styles.errorListItem} key={item.taskId}>
                  <div className={styles.itemTop}>
                    <div className={styles.caseNo}>
                      {formatMessageApi({
                        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
                      })}
                      {item.processInstanceId}
                    </div>
                    <div className={styles.caseType}>{item.activityName}</div>
                  </div>
                  <div className={styles.itemMiddle}>
                    <div className={styles.item}>
                      <p className={styles.itemTitle}>
                        {formatMessageApi({
                          Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.assignee',
                        })}
                      </p>
                      <p className={styles.itemContext}>{item.assignee}</p>
                    </div>
                    <div className={styles.item}>
                      <p className={styles.itemTitle}>
                        {formatMessageApi({
                          Label_BIZ_Claim:
                            'app.navigator.taskDetail.inquireForm.label.completed-time',
                        })}
                      </p>
                      <p className={styles.itemContext}>
                        {item.dueDate && moment(item.dueDate).format('L')}
                      </p>
                    </div>
                    <div className={styles.item}>
                      <p className={styles.itemTitle}>
                        {formatMessageApi({
                          Label_BIZ_Claim:
                            'app.navigator.index.mode.flow.detail.error-occurredTime',
                        })}
                      </p>
                      <p className={styles.itemContext}>{moment(item.dueDate).format('L LT')}</p>
                    </div>
                  </div>
                  <div className={styles.itemBottom}>
                    <img src={handlingPng} alt="" className={styles.handlingPng} />
                    <span className={styles.itemContext}>
                      {formatMessageApi({
                        Label_BIZ_Claim: 'app.navigator.index.mode.flow.detail.error-adminHandle',
                      })}
                    </span>
                  </div>
                </div>
              ))
            : ''}
        </div>
      </div>
    );
  }
}
export default FlowDetailError;
