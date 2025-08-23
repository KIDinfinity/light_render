import React from 'react';
import MCSubscribeMyState from './MCSubscribe/MCSubscribeMyState';
import Messager from './Messager';
import styles from './Drawer.less';

export default () => (
  <div className={styles.drawer}>
    <MCSubscribeMyState />
    <Messager />
  </div>
);
