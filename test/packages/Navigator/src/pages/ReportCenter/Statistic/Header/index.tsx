import React, { PureComponent } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Icon } from 'antd';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

interface IProps {
  collapseState: boolean;
  dispatch: Dispatch;
}

class Header extends PureComponent<IProps> {
  get isEmpty() {
    const { reportMetadata, reportCode } = this.props;
    const listEmpty = isEmpty(reportMetadata?.[reportCode]?.statisticMetadataList);
    return listEmpty;
  }

  handleClick = () => {
    const { dispatch } = this.props;
    if (this.isEmpty) {
      return;
    }
    dispatch({
      type: 'reportCenterController/saveCollapse',
    });
  };

  render() {
    const { collapseState } = this.props;
    return (
      <div className={styles.header}>
        <div className={styles.title}>
          {formatMessageApi({ Label_COM_ReportCenter: 'statistic' })}
        </div>
        <div
          className={classNames(styles.collapse, this.isEmpty && styles.listEmpty)}
          onClick={this.handleClick}
        >
          <Icon
            type="double-right"
            rotate={collapseState ? 90 : 270}
          />
        </div>
      </div>
    );
  }
}

export default connect(({ reportCenterController }: any) => ({
  collapseState: reportCenterController.collapseState,
  reportMetadata: reportCenterController.reportMetadata,
  reportCode: reportCenterController.activeTabKey,
}))(Header);
