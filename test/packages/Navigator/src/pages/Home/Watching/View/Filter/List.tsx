import React, { useEffect } from 'react';
import lodash from 'lodash';
import { Menu, Badge } from 'antd';
import { useDispatch, useSelector } from 'dva';
import HotHighLight from '@/components/Hotkey/home/view/HotHighLight';
import { HotkeyHomeIds } from '@/components/Hotkey/common/enum/hotkeyIds';
import { HomeTaskFilterEnum, TypeEnum } from '@/enum/GolbalAuthority';
import { getCommonAuthorityList } from '@/auth/Utils';
import { Mode } from '../ModePanel/Mode';
import { TaskFilterEnum } from '../../Enum';
import styles from './List.less';
import styled from 'styled-components';
import { tenant } from '@/components/Tenant';

const StyledBig = styled.span`
  font-size: 2rem;
  margin-left: 0.7143rem;
`;

export default ({ authMonitorEntry }) => {
  const dispatch = useDispatch();
  const mode = useSelector(({ navigatorHomeWatching }: any) => navigatorHomeWatching?.mode);

  const statusFilterList = useSelector(
    ({ navigatorHomeWatching }: any) => navigatorHomeWatching.statusFilterList
  );
  const filter = useSelector(({ homeList }: any) => homeList.filter);

  const commonAuthorityList = useSelector(
    ({ authController }: any) => authController.commonAuthorityList || []
  );

  const selectedFolder = useSelector(({ taskFolder }: any) => taskFolder.selectedFolder);

  useEffect(() => {
    if (selectedFolder && lodash.size(selectedFolder) > 0) {
      dispatch({
        type: 'navigatorHomeWatching/getStatusFilterListWithCount',
      });
    }
  }, [filter, selectedFolder]);

  const changeFilter = async (status: any) => {
    await dispatch({
      type: 'navigatorHomeWatching/saveDashboardShow',
      payload: {
        show: status === Mode.Dashboard,
      },
    });

    await dispatch({
      type: 'homeList/saveFilter',
      payload: {
        filter: status,
      },
    });
    // 初始化用户操作状态
    await dispatch({
      type: 'advancedQueryController/initStateOfSearch',
    });
  };

  const unassignedAuth = getCommonAuthorityList(commonAuthorityList, {
    data: HomeTaskFilterEnum.UnassignedTaskPool,
    type: TypeEnum.Menu,
  })?.result && (tenant.isTH() || tenant.isHK());

  const newList =
    mode !== Mode.Flow
      ? lodash.filter(
          statusFilterList,
          (item: any) =>
            lodash.toLower(item.name) !== TaskFilterEnum.Unassigned || unassignedAuth
        )
      : authMonitorEntry
      ? [
          {
            status: filter,
            name: 'Monitor Center',
            count: 0,
          },
        ]
      : [];

  const {
    HomeWatchingTableModule,
    HomeWatchingFilterTable,
    HomeWatchingCardModule,
    HomeWatchingFilterCard,
  } = HotkeyHomeIds;

  return (
    <Menu
      className={styles.menu}
      mode="horizontal"
      onClick={(e) => {
        changeFilter(e.key);
      }}
      selectedKeys={[`${filter}`]}
    >
      {lodash.map(newList, (item: any) => (
        <Menu.Item key={item.status} className={styles['menu-item']}>
          <HotHighLight
            module={[HomeWatchingTableModule, HomeWatchingCardModule]}
            section={[HomeWatchingFilterTable, HomeWatchingFilterCard]}
            childrenClass={styles.activeFocus}
            exCondition={item.status === filter}
          >
            {mode === Mode.Flow ? (
              <div className={styles['monitor-wrapper']}>
                {item.name.split(' ').map((word: string, i: number) => (
                  <React.Fragment key={word + `${i}`}>
                    <StyledBig>{word.slice(0, 1)}</StyledBig>
                    <span>{word.slice(1)}</span>
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div className={styles['menu-wrapper']}>
                {item.name}
                <Badge
                  count={item.count}
                  style={{
                    marginLeft: 4,
                    boxShadow: 'none',
                  }}
                />
              </div>
            )}
          </HotHighLight>
        </Menu.Item>
      ))}
      {/* // TODO:需要加权限 经过要求只对SUP账号开放，和monitor同样权限 */}
      {mode !== Mode.Flow && authMonitorEntry && (
        <Menu.Item key={Mode.Dashboard} className={styles['menu-item']}>
          <HotHighLight
            module={[HomeWatchingTableModule, HomeWatchingCardModule]}
            section={[HomeWatchingFilterTable, HomeWatchingFilterCard]}
            childrenClass={styles.activeFocus}
          >
            <div className={styles['menu-wrapper']}>Dashboard</div>
          </HotHighLight>
        </Menu.Item>
      )}
    </Menu>
  );
};
