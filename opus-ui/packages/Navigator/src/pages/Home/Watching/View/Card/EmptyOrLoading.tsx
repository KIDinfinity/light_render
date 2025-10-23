import React from 'react';
import { Spin } from 'antd';
import CommonEmpty from '@/components/Empty';
import styles from './emptyOrLoading.less';

interface IComponentProps {
  loading: boolean;
}

export default ({ loading }: IComponentProps) => (
  <div className={styles.container}>{loading ? <Spin /> : <CommonEmpty />}</div>
);
