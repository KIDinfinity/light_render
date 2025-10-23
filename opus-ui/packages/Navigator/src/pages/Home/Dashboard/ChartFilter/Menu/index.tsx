import React, { useState } from 'react';
import { Menu } from 'antd';
import { useDispatch } from 'dva';
import lodash, { filter } from 'lodash';
import Filter from '../Filter';
import getFilterChart from './getFilterChart';
import styles from './index.less';

export default ({ chartList, chartListAll, chartListMap, departmentList, categoryList }: any) => {
  const dispatch = useDispatch();

  const selectKeys = filter(
    chartListAll,
    (dashboardCode: string) => !!chartListMap?.[dashboardCode]?.visible
  );

  const [department, setDepartment]: any[] = useState([]);

  const [category, setCategory]: any[] = useState([]);

  const [search, setSearch]: any = useState();

  const onClick = async ({ key: dashboardCode }: any) => {
    await dispatch({
      type: 'dashboardController/toggleChartVisible',
      payload: {
        dashboardCode,
      },
    });
  };

  const { filterChartList, isAllVisible } = getFilterChart({
    chartList,
    chartListAll,
    chartListMap,
    department,
    category,
    search,
  });

  return (
    <Menu selectedKeys={selectKeys} onClick={onClick} className={styles.filterMenu}>
      <Filter
        departmentList={departmentList}
        categoryList={categoryList}
        setDepartment={setDepartment}
        setCategory={setCategory}
        isAllVisible={isAllVisible}
        setSearch={setSearch}
        filterChartList={filterChartList}
      />
      {lodash.map(filterChartList, (dashboardCode: string) => (
        <Menu.Item key={dashboardCode}>
          <span title={chartListMap?.[dashboardCode]?.title}>
            {chartListMap?.[dashboardCode]?.title}
          </span>
        </Menu.Item>
      ))}
    </Menu>
  );
};
