import React, { Component } from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { ReactComponent as IconBack } from 'navigator/assets/flow-detail-return.svg';
import FlowDetailError from './Error/FlowDetailError';
import Overdue from './Overdue';
import styles from './index.less';

@connect(({ homeTaskFlow }) => ({
  homeTaskFlow,
}))
class FolwDetail extends Component {
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'homeTaskFlow/closeFlowDetail',
    });
  }

  backToFlow = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'homeTaskFlow/closeFlowDetail',
    });
  };

  render() {
    return (
      <div className={styles.folwDetail}>
        <FlowDetailError />
        <Overdue />
        <span className={styles.folwDetailBack} onClick={this.backToFlow}>
          <Icon component={IconBack} className={styles.folwDetailIcon} />
        </span>
      </div>
    );
  }
}

export default FolwDetail;
