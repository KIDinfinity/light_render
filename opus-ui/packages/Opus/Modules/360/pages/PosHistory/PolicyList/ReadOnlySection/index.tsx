import React from 'react';
import classnames from 'classnames';
import styles from './index.less';
import DataLayout from '@/components/DataLayout';

const { DataItem } = DataLayout;

export default ({ data }: any) => {
  return data.map(item => (
    <DataItem title={item.label} className={classnames(styles.field, {[styles.doubleLength]: item.span === 8})} key={item.key} >
      {item.value}
    </DataItem>
  ));
};
