import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { Button } from 'antd';
import lodash from 'lodash';
import type { Dispatch } from 'redux';
import styles from './Tabs.less';

function Tabs() {
  const dispatch: Dispatch = useDispatch();
  const tabs: string[] = useSelector((state: any) => state.configurationTabs.tabs);
  const currentTab: string = useSelector((state: any) => state.configurationTabs.currentTab);

  const handleClick = (tab: string) => {
    if (tab === currentTab) {
      return;
    }
    dispatch({
      type: 'configurationTabs/changeCurrentTab',
      payload: {
        currentTab: tab,
      },
    });
  };
  return (
    <div className={styles.tabs}>
      <Button.Group>
        {lodash.map(tabs, (item) => (
          <Button
            key={item}
            onClick={() => handleClick(item)}
            type={item === currentTab ? 'primary' : 'default'}
          >
            {item}
          </Button>
        ))}
      </Button.Group>
    </div>
  );

}
export default Tabs;
