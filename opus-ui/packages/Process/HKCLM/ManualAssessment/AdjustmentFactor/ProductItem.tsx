import React from 'react';
import { Row, Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FactorList from './FactorList';

import styles from './index.less';

export default ({ productItem, index }: any) => {
  const order = index + 1 > 9 ? index + 1 : `0${index + 1}`;

  return (
    <div className={styles.productItem}>
      <Row type="flex" gutter={8} className={styles.title}>
        <Col>{productItem?.policyNo}</Col>
        <Col>{`${order}-${formatMessageApi({
          Dropdown_PRD_Product: productItem?.productCode,
        })}`}</Col>
      </Row>
      <FactorList
        factorList={productItem?.factorList}
        productCode={productItem?.productCode}
        policyNo={productItem?.policyNo}
        incidentId={productItem?.incidentId}
      />
    </div>
  );
};
