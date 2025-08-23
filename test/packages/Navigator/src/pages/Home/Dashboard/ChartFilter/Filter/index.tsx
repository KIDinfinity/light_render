import React from 'react';
import Category from './Category';
import Department from './Department';
import Search from './Search';
import Title from './Title';
import Reverse from './Reverse';
import styles from './index.less';

export default ({
  departmentList,
  categoryList,
  setCategory,
  setDepartment,
  setSearch,
  isAllVisible,
  filterChartList,
}: any) => {
  return (
    <div className={styles.filterContent}>
      <Title />
      <div className={styles.filterItem}>
        <Department departmentList={departmentList} setDepartment={setDepartment} />
        <Category categoryList={categoryList} setCategory={setCategory} />
        <Search setSearch={setSearch} />
      </div>
      <Reverse isAllVisible={isAllVisible} filterChartList={filterChartList} />
    </div>
  );
};
