import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as IconWarn } from 'navigator/assets/icon-warn.svg';
import classNames from 'classnames';
import styles from './index.less';
import OverdueItem from './OverdueItem';

@connect(({ overdueList }) => ({
  overdueList,
}))
class Overdue extends Component {
  state = {
    taskNum: window.innerHeight < 700 ? 2 : 3,
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
    if (window.innerHeight < 700) {
      this.setCaseNum(2);
    } else {
      this.setCaseNum(3);
    }
  };

  setCaseNum = (showTask: any) => {
    const { dispatch }: any = this.props;
    this.setState({
      taskNum: showTask,
    });
    dispatch({
      type: 'overdueList/getOverdueNum',
      payload: { taskNum: showTask },
    });
  };

  previousFn = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'overdueList/previous',
    });
  };

  nextFn = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'overdueList/next',
    });
  };

  render() {
    const { overdueList } = this.props;
    const { list, index, currentList, length } = overdueList;
    const minHeight = this.state.taskNum < 3;
    const overdueMou =
      Array.isArray(currentList) && currentList.length > 0
        ? lodash.map(currentList, (i) => (
            <OverdueItem minHeight={minHeight} key={i?.taskId} item={i} />
          ))
        : '';

    return (
      <div className={classNames(styles.overdue, minHeight ? styles.minOverdue : '')}>
        {index > 0 && (
          <i className={styles.overdueIconLeft} onClick={this.previousFn}>
            <Icon type="left" />
          </i>
        )}
        {list?.length - 1 > index && (
          <i className={styles.overdueIconRight} onClick={this.nextFn}>
            <Icon type="right" />
          </i>
        )}
        {length > 0 && (
          <div className={styles.overdueTitle}>
            <Icon component={IconWarn} />
            {formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.index.mode.flow.detail.overdue',
            })}
            {': '}
            {length}
          </div>
        )}
        <div className={styles.overdueList}>{overdueMou}</div>
      </div>
    );
  }
}

export default Overdue;
