import React from 'react';
import { Col } from 'antd';
import styles from './index.less';

export default ({ label, text, span = 6 }: any) => {
  return (
    <Col span={span}>
      <div className={styles.headerContent}>
        <div className={styles.label}>{label}</div>
        <div className={styles.text}>{text}</div>
      </div>
    </Col>
  );
};
