import React from 'react';

import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { Row, Col } from 'antd';
import classNames from 'classnames';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import { FormBorderCard } from 'basic/components/Form';
import Invoice from 'process/Components/BussinessControls/Invoice';
import styles from './LYMA.less';

interface IProps {
  NAMESPACE: string;
  namespaceType: string;
  editable: boolean;
  incidentId: string;
  treatmentId: string;
  invoiceId: string;
}

const LYMAItem = (props: IProps) => {
  const { NAMESPACE, editable, treatmentId, invoiceId } = props;

  const dispatch = useDispatch();

  const item = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.claimEntities?.invoiceListMap?.[props.invoiceId]
  );
  const serviceItemPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemPayableListMap
  );

  const handleDelete = async () => {
    await dispatch({
      type: `${NAMESPACE}/removeInvoiceItem`,
      payload: {
        treatmentId,
        invoiceId,
      },
    });

    lodash.map(
      lodash.filter(serviceItemPayableListMap, { invoiceId }),
      ({ invoicePayableId: invoicePayableItemId, id: serviceItemPayableItemId }) => {
        dispatch({
          type: `${NAMESPACE}/removeServicePayableItem`,
          payload: {
            invoicePayableItemId,
            serviceItemPayableItemId,
          },
        });
      }
    );
  };

  const isAdjustMent = item?.isAdjustment === IsAdjustment.Yes;

  return (
    <div className={styles.Item}>
      <Row type="flex" gutter={0} className={styles.container}>
        <Col span={10} className={styles.left}>
          <FormBorderCard
            button={{ visiable: editable, callback: handleDelete }}
            className={classNames(styles.content, isAdjustMent && styles.isAdjustment)}
          >
            <Invoice.SectionBasic {...props} />
          </FormBorderCard>
        </Col>
        <Col span={14} className={styles.right}>
          <></>
        </Col>
      </Row>
    </div>
  );
};
export default LYMAItem;
