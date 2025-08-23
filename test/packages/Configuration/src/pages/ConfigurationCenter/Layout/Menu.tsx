import React from 'react';
import { useSelector,useDispatch } from 'dva';
import { Icon } from 'antd';
import lodash from 'lodash';
import styles from './Menu.less';
import type { CurrentMenuProps } from '../Utils/Typings';
import Operation from '../Operation';

function Menu() {
  const dispatch = useDispatch();
  const menu=useSelector((state: any)=>state.configurationMenu.menu);
  const menuRoot=useSelector((state: any)=>state.configurationMenu.menuRoot);
  const openKeys=useSelector((state: any)=>state.configurationMenu.openKeys);
  const currentMenu=useSelector((state: any)=>state.configurationMenu.currentMenu);

  const onOpenChange = async (key: string, e: MouseEvent) => {
    e.stopPropagation();
    const newOpenKeys = lodash.includes(openKeys, key)
      ? openKeys.filter((el: any) => el !== key)
      : openKeys.concat([key]);

    await dispatch({
      type: 'configurationMenu/changeMenuOpenKeys',
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
      type: 'configurationMenu/setCurrentMenu',
      payload: {
        functionId,
        functionCode,
      },
    });
  };

  const getMenu = (subMenu: CurrentMenuProps[] = [], level = 1) => {
    return lodash.map(subMenu, (item) => {
      const isOpen = lodash.includes(openKeys, item.id);
      const isCurrent = currentMenu.id === item.id;
      const isActive = lodash.includes(menuRoot, item.id);
      return item.subFunctionList.length ? (
        <div
          className={`${styles.subMenu} ${item.visible !== '1' && styles.hidden}`}
          key={item.id}
          title={item.functionName}
          onClick={(e: any)=>onOpenChange(item.id,e)}
        >
          <div
            className={`${styles.subMenuTitle} ${isActive && styles.active} ${isCurrent && styles.activeMenu
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
          className={`${styles.menuItem} ${isCurrent && styles.current} ${item.visible !== '1' && styles.hidden
            }`}
          key={item.id}
          title={item.functionName}
          onClick={(e: any)=>{onSelect(item,e)}}
          style={{ paddingLeft: `${level * 24}px` }}
        >
          {item.functionName}
        </div>
      );
    });
  };

  const MenuEl = getMenu(menu);
  return (
    <div className={styles.menu}>
      <div className={styles.menuContent}>{MenuEl}</div>
      <Operation.InitCCSystem />
    </div>
  );

}
export default Menu
