import React from 'react';
import { Row, Col } from 'antd';
import { useDispatch } from 'dva';
import { Invoice } from 'process/Components/BussinessControls';
import styles from './LYMA.less';

interface Props {
  NAMESPACE: string;
  namespaceType: string;
  editable: boolean;
  incidentId: string;
  treatmentId: string;
  dispatch: Function;
}
const LYMAAdd = ({ NAMESPACE, namespaceType, editable, incidentId, treatmentId }: Props) => {
  const dispatch = useDispatch();

  const defaultProps = {
    NAMESPACE,
    namespaceType,
    incidentId,
    treatmentId,
    editable,
    dispatch,
  };
  return (
    <div className={styles.invoiceItem}>
      <Row className={styles.container}>
        <Col span={10} className={styles.left}>
          <Invoice.SectionAdd {...defaultProps} />
        </Col>
        <Col span={14} className={styles.lastRight}>
          <></>
        </Col>
      </Row>
    </div>
  );
};

export default LYMAAdd;
