import React from 'react';
import { Select, Pagination } from 'antd';
import styles from './index.less';

export default ({ total, current, handlePageChange }: any) => {
  return [
    <Select.Option
      style={{ cursor: 'default', padding: '5px 0' }}
      disabled
      key="pages"
      className={styles.pages}
    >
      <Pagination
        size="small"
        total={total}
        current={current}
        style={{ width: '100%', textAlign: 'center' }}
        onChange={handlePageChange}
        showLessItems
        showSizeChanger={false}
      />
    </Select.Option>,
  ];
};
