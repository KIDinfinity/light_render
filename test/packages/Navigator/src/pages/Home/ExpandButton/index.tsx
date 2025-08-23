import React from 'react';
import { ReactComponent as DashboardIcon } from 'navigator/assets/dashboard-icon.svg';
import { ReactComponent as DashboardActiveIcon } from 'navigator/assets/dashboard-icon-active.svg';
import { ReactComponent as BottomBanner } from 'navigator/assets/expand_tab_drawer.svg';
import { Icon } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { Mode } from '../Watching/View/ModePanel/Mode';
import classNames from 'classnames';
import styles from './index.less';
import lodash from 'lodash';
import { TableVersion } from 'navigator/enum/HomeTableVersion';

export default () => {
  const dispatch = useDispatch();
  const tableVersion = useSelector((state: any) => state.navigatorHomeWatching.homeTableVersion);

  const chartListV2Map = useSelector((state: any) => state.dashboardController?.chartListV2Map);
  const dashboardHidden = useSelector((state: any) => state.navigatorHomeWatching.dashboardHidden);

  const leftData = chartListV2Map?.left || [];
  const rightData = chartListV2Map?.right || [];

  const dashboardNum = lodash.compact([
    !lodash.isEmpty(leftData),
    !lodash.isEmpty(rightData),
  ]).length;

  const mode = useSelector((state: any) => state.navigatorHomeWatching.mode) || '';
  const handleExpand = () => {
    dispatch({ type: 'navigatorHomeWatching/handleDashboardHidden' });
  };

  React.useEffect(() => {
    dispatch({
      type: 'navigatorHomeWatching/getTableVersion',
    });
  }, []);

  React.useEffect(() => {
    if (dashboardNum < 1) {
      dispatch({
        type: 'navigatorHomeWatching/handleDashboardHidden',
        payload: { dashboardHidden: true },
      });
    }
  }, [dashboardNum]);

  return (
    <div
      className={classNames(styles.dashboardExpandBtn, {
        [styles.dashboardExpandBtnHidden]:
          mode !== Mode.Table || tableVersion === TableVersion.DEFAULT || dashboardNum < 1,
        [styles.dashboardExpandBtnActive]: dashboardHidden === true,
      })}
    >
      <div className={styles.binder} onClick={handleExpand}>
        <BottomBanner className={styles.bottomBanner} />
        <span className={classNames(styles.iconContainer, 'guidance-newTable-container-two')}>
          <Icon component={dashboardHidden ? DashboardIcon : DashboardActiveIcon} />
        </span>
      </div>
    </div>
  );
};
