import React from 'react';
import { Row, Col } from 'antd';
import { useDispatch } from 'dva';
import { Invoice } from 'process/Components/BussinessControls';
import styles from './LYDC.less';

interface Props {
  NAMESPACE: string;
  namespaceType: string;
  editable: boolean;
  incidentId: string;
  treatmentId: string;
  nextInvoiceNo: number;
  dispatch: Function;
}
const LYDCAdd = ({
  NAMESPACE,
  namespaceType,
  editable,
  incidentId,
  treatmentId,
  nextInvoiceNo,
}: Props) => {
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
      <div className={styles.header}>
        <div className={styles.number}>{nextInvoiceNo}</div>
      </div>
      <Row type="flex" gutter={16} style={{ flex: 1 }}>
        <Col span={5}>
          <Invoice.SectionAdd {...defaultProps} />
        </Col>
      </Row>
    </div>
  );
};

export default LYDCAdd;
