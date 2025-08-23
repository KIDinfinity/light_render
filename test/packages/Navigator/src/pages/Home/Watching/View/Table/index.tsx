import React from 'react';
import CategoryFilter from '../CategoryFilter';
import styles from './index.less';
import Table from './Table';
import TableGetData from './TableGetData';
import classNames from 'classnames';
import { useSelector } from 'dva';

export default () => {
  const isInTHExcludeEnv = false;

  const dashboardVersion = useSelector((state: any) => state.dashboardController.dashboardVersion);

  return (
    <div
      className={classNames({
        [styles.bg]: true,
        [styles.gap]: dashboardVersion !== 'common',
        [styles.gap2]: dashboardVersion === 'common',
      })}
    >
      {!isInTHExcludeEnv && <CategoryFilter />}
      <TableGetData />
      <Table />
    </div>
  );
};
