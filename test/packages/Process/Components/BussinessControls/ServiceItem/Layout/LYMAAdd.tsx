import React from 'react';
import { Row, Col } from 'antd';
import classNames from 'classnames';
import { FormBorderCard } from 'basic/components/Form';
import ServiceItem from 'process/Components/BussinessControls/ServiceItem';
import styles from './LYMA.less';

const LYMAAdd = (props: any) => {
  return (
    <div className={styles.serviceItem}>
      <Row type="flex" gutter={0}>
        <Col span={10} className={classNames(styles.left, styles.lastServerList)}>
          <FormBorderCard backgroundColorName={'card4BgColor'}>
            <div className={styles.main}>
              <div className={styles.boxDom}>
                <ServiceItem.SectionAdd {...props} />
              </div>
            </div>
          </FormBorderCard>
        </Col>
        <Col span={14} className={styles.right} />
      </Row>
    </div>
  );
};

export default LYMAAdd;
