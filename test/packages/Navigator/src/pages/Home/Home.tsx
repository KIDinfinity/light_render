import React from 'react';
import Watching from './Watching';
import Filter from './Watching/View/Filter';
import Dashboard from './Dashboard';
import Monitor from './Monitor';
import { Mode } from './Watching/View/ModePanel/Mode';
import { useSelector } from 'dva';
import { TypeEnum } from '@/enum/GolbalAuthority';
import styles from './Home.less';
import ScrollWrapper from '@/components/ScrollWrapper';
import classNames from 'classnames';
import ExpandButton from './ExpandButton';
import lodash from 'lodash';
import HomeNoData from './HomeNoData';
import { Spin } from 'antd';
export default () => {
  const commonAuthorityList = useSelector((state: any) => state.authController.commonAuthorityList);
  const mode = useSelector((state: any) => state.navigatorHomeWatching.mode) || '';
  const dashboardHidden = useSelector((state: any) => state.navigatorHomeWatching.dashboardHidden);
  const AuthMonitorEntry = lodash
    .chain(commonAuthorityList)
    .filter((item) => item.result && item.type === TypeEnum.Comm)
    .map((item) => item.authorityCode)
    .find((item) => item === 'RS_Entry_MonitorEntry')
    .value();

  const statusFilterList = useSelector(
    ({ navigatorHomeWatching }: any) => navigatorHomeWatching.statusFilterList
  );
  const filter = useSelector(({ homeList }: any) => homeList.filter);

  const chartListV2Map = useSelector((state: any) => state.dashboardController?.chartListV2Map);

  const leftData = chartListV2Map?.left || [];
  const rightData = chartListV2Map?.right || [];

  const todoListIsEmpty =
    (statusFilterList?.find((item) => item.status === filter)?.count || 0) === 0;
  const dashboardIsEmpty = lodash.isEmpty(leftData) && lodash.isEmpty(rightData);

  const filterListFirstLoading = useSelector(
    ({ navigatorHomeWatching }: any) => navigatorHomeWatching.firstLoading
  );
  const chartFirstLoading = useSelector((state: any) => state.dashboardController?.firstLoading);

  return (
    <>
      <Filter authMonitorEntry={AuthMonitorEntry} />
      {mode === Mode.Flow && AuthMonitorEntry && <Monitor />}
      {!(mode === Mode.Flow && AuthMonitorEntry) &&
        todoListIsEmpty &&
        dashboardIsEmpty &&
        (chartFirstLoading && filterListFirstLoading ? (
          <Spin className={styles.spin} />
        ) : (
          <HomeNoData dashboardHidden={false} />
        ))}
      {!(mode === Mode.Flow && AuthMonitorEntry) && !(todoListIsEmpty && dashboardIsEmpty) && (
        <ScrollWrapper>
          <div className={styles.home}>
            <div
              className={classNames({
                [styles.watchingContainer]: true,
                [styles.watchingContainerOverflow]: mode === Mode.Table,
                [styles.watchingContainerTableV2]: dashboardHidden && mode === Mode.Table,
              })}
            >
              {filterListFirstLoading && <Spin className={styles.spin} />}
              {!filterListFirstLoading && !todoListIsEmpty && <Watching />}
              {!filterListFirstLoading && todoListIsEmpty && (
                <HomeNoData dashboardHidden={!dashboardHidden || mode !== Mode.Table} />
              )}
            </div>
            <div
              className={classNames(styles.dashboardContainer, {
                [styles.dashboardContainerHidden]: dashboardHidden && mode === Mode.Table,
              })}
            >
              <Dashboard />
            </div>
            <ExpandButton />
          </div>
        </ScrollWrapper>
      )}
    </>
  );
};
