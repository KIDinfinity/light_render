import React from 'react';
import lodash from 'lodash';
import { Row, Col } from 'antd';
import FactorCodeItem from './FactorCodeItem';
import FactorItem from './FactorItem';
import styles from './index.less';

export default ({ factorList, policyNo, productCode, incidentId }: any) => {
  const factorKey = `${policyNo}${productCode}${incidentId}`;
  return (
    <Row className={styles.factorList}>
      {lodash.map(factorList, (factorItem: any) => (
        <Col key={`${factorKey}${factorItem.factorCode}`} span={8}>
          <FactorCodeItem
            factorKey={factorKey}
            factorItem={factorItem}
            productCode={productCode}
            policyNo={policyNo}
            incidentId={incidentId}
          />

          <div className={styles.list}>
            {factorItem.list.map((item: any) => {
              return (
                <div
                  className={styles.item}
                  key={`${factorKey}${factorItem.factorCode}${item.policyYear}`}
                >
                  <FactorItem
                    factorItem={item}
                    policyNo={policyNo}
                    productCode={productCode}
                    incidentId={incidentId}
                    isSelected={factorItem?.isSelected}
                  />
                </div>
              );
            })}
          </div>
        </Col>
      ))}
    </Row>
  );
};
