import React, { useState } from 'react';
import { Dropdown, Button } from 'antd';
import { useSelector } from 'dva';
import { ReactComponent as FilterSvg } from 'navigator/assets/filter-menu-item.svg';
import Menu from './Menu';
import styles from './index.less';

export default () => {
  const [visible, setVisible] = useState(false);

  const { chartList, chartListAll, chartListMap, categoryList, departmentList } = useSelector(
    (state: any) => state.dashboardController
  );

  const loading = useSelector(
    (state: any) => state.loading.effects['dashboardController/listDashboards']
  );

  const onVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  return (
    <>
      {chartListAll.length > 0 && !loading && (
        <div className={styles.chartFilter}>
          <Dropdown
            overlay={
              <Menu
                chartList={chartList}
                chartListAll={chartListAll}
                chartListMap={chartListMap}
                categoryList={categoryList}
                departmentList={departmentList}
              />
            }
            onVisibleChange={onVisibleChange}
            visible={visible}
            getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
            trigger={['click']}
          >
            <Button size="small" className={styles.filterBtn}>
              <FilterSvg className={styles.filterIcon} />
            </Button>
          </Dropdown>
        </div>
      )}
    </>
  );
};
