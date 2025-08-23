import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import TabList from './TabList';
import BtnGroup from './BtnGroup';
import styles from './index.less';
import { Link } from 'umi';
import Logo from '@/components/Logo/logo';

interface IProps {
  dispatch: Dispatch;
  activeTabKey: string;
}

@connect(({ reportCenterController, theme }) => ({
  activeTabKey: reportCenterController.activeTabKey,
  reportListMap: reportCenterController.reportListMap,
  originActiveTheme: theme.originActiveTheme,
}))
class SlideBar extends Component<IProps> {
  getSelectList(selectItem) {
    return [
      ...new Set(
        lodash.compact(
          lodash.map(this.props.reportListMap, (item) => {
            return item[selectItem];
          })
        )
      ),
    ];
  }

  render() {
    const { activeTabKey } = this.props;
    return (
      <div className={styles.slideBar}>
        <div className="logo">
          <Link to={'/navigator'} key="logo">
            <Logo type="5" />
          </Link>
        </div>
        {/* TODO: hide/show dashboard先不上 */}
        {/* <div className={styles.icons}>
          <FilterTab
            departmentList={this.getSelectList('department')}
            categoryList={this.getSelectList('reportCategory')}
          />
        </div> */}
        <TabList />
        {activeTabKey ? <BtnGroup /> : null}
      </div>
    );
  }
}

export default SlideBar;
