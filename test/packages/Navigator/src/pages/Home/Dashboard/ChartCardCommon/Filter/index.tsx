import React from 'react';
import classnames from 'classnames';
import { useSelector } from 'dva';
import Form from './Form';
import styles from './index.less';

export default ({ dashboardCode }: any) => {
  const { dashboardSearchFieldList, searchDatas } =
    useSelector((state: any) => state.dashboardController?.chartListMap?.[dashboardCode]) || {};

  return (
    <div className={classnames(styles.filterContent)}>
      <Form
        dashboardCode={dashboardCode}
        searchDatas={searchDatas}
        dashboardSearchFieldList={dashboardSearchFieldList}
      />
    </div>
  );
};
