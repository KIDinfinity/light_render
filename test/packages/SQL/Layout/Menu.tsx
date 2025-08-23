import React from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'dva';
import styles from './Menu.less';

function Menu({ pageConfig }) {
  const dispatch = useDispatch();
  const currentMenu = useSelector(({ sqlController }: any) => sqlController.currentMenu);

  const onChangeMenu = (menu: string) => {
    if (menu === 'query' || menu === 'queryOnly') {
      dispatch({
        type: 'sqlController/saveSQL',
        payload: {
          sql: '',
        },
      });
    }
    dispatch({
      type: 'sqlController/saveCurrentMenu',
      payload: {
        currentMenu: menu,
      },
    });
  };

  return (
    <div className={styles.menu}>
      <div className={styles.menuContent}>
        {Object.keys(pageConfig).map((menu: string) => (
          <div
            key={menu}
            className={classnames({
              [styles.menuItem]: true,
              [styles.active]: menu === currentMenu,
            })}
            onClick={() => onChangeMenu(menu)}
          >
            {pageConfig[menu].desc}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Menu;
