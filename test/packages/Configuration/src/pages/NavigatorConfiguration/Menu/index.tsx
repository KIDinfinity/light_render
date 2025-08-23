import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { Icon, Badge } from 'antd';
import lodash from 'lodash';
import type { Dispatch } from 'redux';
import type { CurrentMenuProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import styles from './Menu.less';
import Sider from './Sider';
import Operator from './Operator';
import Search from '../Container/TableList/Search';

interface IProps {
  TableSearch: any;
}

function Menu({ TableSearch }: IProps) {
  const dispatch: Dispatch = useDispatch();
  const menu: CurrentMenuProps[] = useSelector((state: any) => state.configurationController?.menu);
  const menuRoot: string[] = useSelector((state: any) => state.configurationController?.menuRoot);
  const openKeys: string[] = useSelector((state: any) => state.configurationController?.openKeys);
  const currentMenu: CurrentMenuProps = useSelector(
    (state: any) => state.configurationController?.currentMenu
  );
  const checkVisiable = ({ visible }: any) => {
    return visible || visible === '1';
  };

  const onOpenChange = async (key: string, e: MouseEvent) => {
    e.stopPropagation();
    const newOpenKeys = lodash.includes(openKeys, key)
      ? openKeys.filter((el) => el !== key)
      : openKeys.concat([key]);

    await dispatch({
      type: 'configurationController/saveMenuOpenKeys',
      payload: {
        openKeys: newOpenKeys,
      },
    });
  };

  const onSelect = async (item: CurrentMenuProps, e: MouseEvent) => {
    e.stopPropagation();
    const { id: functionId, functionCode } = item;
    if (currentMenu.id === functionId) {
      return;
    }
    await dispatch({
      type: 'configurationController/setCurrentMenu',
      payload: {
        functionId,
        functionCode,
      },
    });
  };

  const getMenu = (menuData: CurrentMenuProps[] = [], level = 1) => {
    return lodash.map(menuData, (item) => {
      const isOpen = lodash.includes(openKeys, item.id);
      const isCurrent = currentMenu.id === item.id;
      const isActive = lodash.includes(menuRoot, item.id);
      const isVisible = checkVisiable(item);

      return item?.subFunctionList?.length ? (
        <div
          className={`${styles.subMenu} ${!isVisible && styles.hidden}`}
          key={item.id}
          title={item.functionName}
          onClick={onOpenChange.bind(this, item.id)}
        >
          <div
            className={`${styles.subMenuTitle} ${isActive && styles.active} ${
              isCurrent && styles.activeMenu
            }`}
            style={{ paddingLeft: `${level * 24}px` }}
          >
            <div className={styles.titleWord}>{item.functionName}</div>
            <Icon type={`${isOpen ? 'up' : 'down'}`} className={styles.arrow} />
          </div>
          <div className={`${styles.subMenuChild} ${!isOpen && styles.hidden}`} data-id={item.id}>
            {getMenu(item.subFunctionList, level + 1)}
          </div>
        </div>
      ) : (
        <div
          className={`${styles.menuItem} ${isCurrent && styles.current} ${
            !isVisible && styles.hidden
          }`}
          key={item.id}
          title={item.functionName}
          onClick={onSelect.bind(this, item)}
          style={{ paddingLeft: `${level * 12}px` }}
        >
          {isCurrent ? (
            <>
              <Badge className={styles.activeBadge} status="warning" text={item.functionName} />
              <Search />
            </>
          ) : (
            <>{item.functionName}</>
          )}
        </div>
      );
    });
  };
  const MenuEl = getMenu(menu);

  return (
    <Sider>
      <div className={styles.menu}>
        <div className={styles.menuContent}>{MenuEl}</div>
      </div>
      {/**
        @ts-ignore*/}
      <Operator TableSearch={TableSearch} />
    </Sider>
  );
}
export default Menu;
