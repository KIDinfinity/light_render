import React from 'react';
import { Col, Row } from 'opus/Components/Antd';

import OverView from './OverView';
import LeaveOverView from './LeaveOverView';
import AllCase from '../../Components/AllCase';

import styles from './index.less';

export default (props: any) => {
  return (
    <div className={styles.contrainer}>
      <Row gutter={16} className={styles.itemContrainer}>
        <Col span={14} className={styles.item}>
          <OverView />
        </Col>
        <Col span={10} className={styles.item}>
          <LeaveOverView />
        </Col>
      </Row>
      <AllCase {...props} />
    </div>
  );
};
