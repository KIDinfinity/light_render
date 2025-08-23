import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Sider, Menu } from './Layout';
import styles from './Styles/index.less';
import Main from './Main';

function ConfigurationCenter() {
  const dispatch = useDispatch();
  const mode = useSelector((state: any) => state.configurationCenter.mode);
  const modeType = {
    table: <Main />,
  };

  useEffect(() => {
    dispatch({
      type: 'configurationMenu/listMenu',
    });
    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: ['Dropdown_CFG_UserStatus'],
    });
  }, []);

  return (
    <div className={styles.container}>
      <Sider>
        <Menu />
      </Sider>
      <div className={styles.content}>{modeType[mode]}</div>
    </div>
  );
}

export default ConfigurationCenter;
