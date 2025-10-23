import React from 'react';
import lodash from 'lodash';
import useGetBankInfoColumns from 'process/NB/ManualUnderwriting/_hooks/useGetBankInfoColumns';
import { Row, Col } from 'antd';
import styles from './index.less';

export default () => {
  const bankInfoColumns = useGetBankInfoColumns();

  return (
    <Row gutter={[16, 16]} className={styles.fie}>
      {lodash.map(bankInfoColumns, (e, index) => (
        <Col key={index} span={e?.span}>
          {e?.title}
        </Col>
      ))}
    </Row>
  );
};
