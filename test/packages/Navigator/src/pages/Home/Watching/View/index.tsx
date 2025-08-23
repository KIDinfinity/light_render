import React, { useEffect } from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { Hotkey } from '@/components/Hotkey/home';
import { HotkeyHomeIds } from '@/components/Hotkey/common/enum/hotkeyIds';
import OrderDirection from '@/components/Hotkey/home/enum/orderDirection';
import classNames from 'classnames';
import { Mode } from './ModePanel/Mode';

import Flow from './Flow';
import Card from './Card';
import Table from './Table';
import Dashboard from './Dashboard';
import styles from './index.less';
import './tableModal.less';

const IsolatedDataUpdate = () => {
  const dispatch = useDispatch();
  const isConfigurationEmpty = useSelector((state: any) =>
    lodash.isEmpty(state.configController?.configuration)
  );
  const nextFilter = useSelector(
    (state: any) => state.homeList.filter !== state.homeList.filterState && state.homeList.filter
  );

  useEffect(() => {
    if (nextFilter && !isConfigurationEmpty) {
      dispatch({
        type: 'navigatorHomeWatching/getHomeFilterList',
        payload: {
          filter: nextFilter,
        },
      });
    }
  }, [nextFilter, isConfigurationEmpty]);

  return null;
};

export default () => {
  const dispatch = useDispatch();

  const mode = useSelector((state: any) => state.navigatorHomeWatching.mode) || '';
  const dashboardVersion = useSelector((state: any) => state.dashboardController.dashboardVersion);
  const showDashboard =
    useSelector(({ navigatorHomeWatching }: any) => navigatorHomeWatching.dashboardData?.show) ||
    false;

  useEffect(() => {
    dispatch({
      type: 'navigatorHomeWatching/saveModeButton',
      payload: {
        mode,
      },
    });
  }, []);

  /**
   * hotkey改变事件(TODO:这里的逻辑可以优化,太多判断了)
   * type - 类型(0:向前;1:向后)
   */
  const handleHotkeyChange = async (type: number) => {
    const store = await dispatch({
      type: 'global/accessStore',
    });
    const list = store?.navigatorHomeWatching?.statusFilterList || [];
    let index = list.findIndex((item: any) => {
      return item.status === store.homeList.filter;
    });
    switch (type) {
      case 0:
        if (index === list.length - 1) {
          index = 0;
        } else {
          index += 1;
        }
        break;

      default:
        if (index === 0) {
          index = list.length - 1;
        } else {
          index -= 1;
        }
        break;
    }
    setTimeout(async () => {
      await dispatch({
        type: 'homeList/saveFilter',
        payload: {
          filter: list[index].status,
        },
      });

      // 初始化用户操作状态
      await dispatch({
        type: 'advancedQueryController/initStateOfSearch',
      });
    }, 100);
  };

  const configComponents = {
    [Mode.Flow]: (
      <div>
        <Hotkey
          id={[
            HotkeyHomeIds.HomeWatchingFlow,
            HotkeyHomeIds.HomeWatchingFlowAdvancedSearch,
            HotkeyHomeIds.HomeWatchingFlowActivityList,
          ]}
        />
        <div className={styles.flowBox}>
          <Flow />
        </div>
      </div>
    ),
    [Mode.Card]: <Card handleHotkeyChange={handleHotkeyChange} />,
    [Mode.Table]: (
      <div className={styles.tableWrapper}>
        <Hotkey
          id={[HotkeyHomeIds.HomeWatchingTableModule, HotkeyHomeIds.HomeWatchingFilterTable]}
        />
        <Hotkey
          id={HotkeyHomeIds.HomeWatchingFilterItem}
          next={() => {
            handleHotkeyChange(0);
          }}
          prev={() => {
            handleHotkeyChange(1);
          }}
        />
        <Hotkey
          id={HotkeyHomeIds.HomeWatchingTable}
          next={() => {
            setTimeout(() => {
              dispatch({
                type: 'advancedQueryController/saveStateOfSearchA',
                payload: {
                  direction: OrderDirection.Next,
                },
              });
            }, 500);
          }}
          prev={() => {
            setTimeout(() => {
              dispatch({
                type: 'advancedQueryController/saveStateOfSearchA',
                payload: {
                  direction: OrderDirection.Prev,
                },
              });
            }, 500);
          }}
        />
        <div
          className={classNames({
            [styles.tableBox]: dashboardVersion !== 'common',
            [styles.tableBox2]: dashboardVersion === 'common',
          })}
        >
          <Table />
        </div>
      </div>
    ),
  };

  return (
    <>
      <div
        className={classNames(styles.overflow, {
          [styles.card]: mode === Mode.Card,
          [styles.dashboard]: !!showDashboard,
        })}
      >
        {!!showDashboard ? <Dashboard /> : configComponents[mode]}
      </div>
      <IsolatedDataUpdate />
    </>
  );
};
