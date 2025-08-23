import React from 'react';
import Execute from './Operator/Execute';
import Down from './Operator/Down';
import styles from './index.less';

export default (search: any) => [
  {
    title: 'fileName',
    dataIndex: 'fileName',
  },
  {
    title: '',
    width: 80,
    render: (record: any) => (
      <div className={styles.operator}>
        <Execute record={record} search={search} />
        <Down record={record} />
      </div>
    ),
  },
];
