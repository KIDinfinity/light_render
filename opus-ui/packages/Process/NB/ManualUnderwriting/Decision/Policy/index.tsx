import React from 'react';
import { Row, Col } from 'antd';
import Exclusion from './Exclusion';
import Decision from './Decision';
import styles from './index.less';

const Policy = ({ decisionCode }: any) => {
  const record = {
    coreCode: 'All',
  };

  return (
    <>
      <Row className={styles.decision} gutter={[16, 16]} style={{ margin: 0 }}>
        <Col span={24} className={styles.wrapPadding}>
          <Decision decisionCode={decisionCode} />
        </Col>
      </Row>
      <div className={styles.policy}>
        <Exclusion record={record} />
      </div>
    </>
  );
};

export default Policy;
