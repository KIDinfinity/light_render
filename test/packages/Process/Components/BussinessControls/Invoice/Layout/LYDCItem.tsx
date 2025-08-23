import React from 'react';
import { Row, Col, Button } from 'antd';
import { useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Invoice from 'process/Components/BussinessControls/Invoice';
import styles from './LYDC.less';

interface Props {
  NAMESPACE: string;
  namespaceType: string;
  editable: boolean;
  incidentId: string;
  treatmentId: string;
  invoiceId: string;
  nextInvoiceNo: number;
  Service: Function;
}
const LYDCItem = ({
  NAMESPACE,
  namespaceType,
  editable,
  incidentId,
  treatmentId,
  invoiceId,
  nextInvoiceNo,
  Service,
}: Props) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch({
      type: `${NAMESPACE}/removeInvoiceItem`,
      payload: {
        treatmentId,
        invoiceId,
      },
    });
  };

  const defaultProps = {
    NAMESPACE,
    namespaceType,
    editable,
    incidentId,
    treatmentId,
    invoiceId,
  };

  return (
    <div className={styles.Item}>
      <div className={styles.header}>
        <div className={styles.number}>{nextInvoiceNo}</div>
      </div>
      <Row type="flex" gutter={16}>
        <Col span={5}>
          <Invoice.SectionBasic {...defaultProps} />
        </Col>
        <Col span={19} style={{ paddingLeft: '32px' }}>
          <div className={styles.operator}>
            {editable && (
              <Button onClick={onDelete} className={styles.button}>
                {formatMessageApi({
                  Label_BPM_Button: 'app.navigator.task-detail-of-data-capture.button.delete',
                })}
              </Button>
            )}
          </div>
          <Service {...defaultProps} />
        </Col>
      </Row>
    </div>
  );
};
export default LYDCItem;
