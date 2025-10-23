import React, { Component } from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import logoFwdLight from '@/assets/public/fwd-logo-dark.png';
import logoFwdDark from '@/assets/public/fwd-logo-light.png';
import TabList from './TabList/TabList';
import BtnGroup from './BtnGroup/BtnGroup';
import styles from './slideBar.less';

interface IProps {
  dispatch: Dispatch;
  activeTabKey: string;
}

@connect(({ reportCenterOldController, theme }) => ({
  activeTabKey: reportCenterOldController.activeTabKey,
  originActiveTheme: theme.originActiveTheme,
}))
class SlideBar extends Component<IProps> {
  componentDidMount = async () => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'reportCenterOldController/getReportList',
    });
  };

  goHome = () => {
    history.push('/navigator');
  };

  render() {
    const { activeTabKey, originActiveTheme } = this.props;
    return (
      <div className={styles.slideBar}>
        <div className="logo">
          <img
            src={originActiveTheme === 'dark' ? logoFwdDark : logoFwdLight}
            onClick={this.goHome}
            alt="fwd"
          />
        </div>
        <TabList />
        {activeTabKey ? <BtnGroup /> : null}
      </div>
    );
  }
}

export default SlideBar;
