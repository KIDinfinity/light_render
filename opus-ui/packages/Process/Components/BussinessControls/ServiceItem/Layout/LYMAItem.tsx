import React from 'react';

import { useSelector } from 'dva';
import { Row, Col } from 'antd';
import classNames from 'classnames';
import lodash from 'lodash';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import { FormBorderCard } from 'basic/components/Form';
import { ServiceItem } from 'process/Components/BussinessControls';
import styles from './LYMA.less';

const LYMAItem = (props: any) => {
  const {
    NAMESPACE,
    invoiceId,
    serviceItemId,
    index,
    lenght,
    Payable,
    ButtonGroup,
  } = props;
  const item = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemListMap?.[serviceItemId]
  );

  const isAdjustMent = item?.isAdjustment === IsAdjustment.Yes;

  const defaultProps = lodash.omit(props, ['Payable', 'index', 'lenght']);
  return (
    <div className={styles.serviceItem}>
      <Row type="flex" gutter={0}>
        <Col
          span={10}
          className={classNames(
            styles.left,
            Number(lenght) === Number(index) + 1 && styles.lastServerList
          )}
        >
          <FormBorderCard
            className={classNames(styles.borderCard, isAdjustMent && styles.isAdjustment)}
          >
            <div className={styles.main} id={serviceItemId}>
              <ButtonGroup
                invoiceId={invoiceId}
                serviceItemId={serviceItemId}
              />
              <div className={styles.boxDom}>
                <ServiceItem.SectionBasic {...defaultProps} />
              </div>
            </div>
          </FormBorderCard>
        </Col>
        <Col span={14} className={styles.right}>
          <Payable {...defaultProps} />
        </Col>
      </Row>
    </div>
  );
};
export default LYMAItem;
