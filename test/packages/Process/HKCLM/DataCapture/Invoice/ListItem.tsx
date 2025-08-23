import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form, Row, Col, Button } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import Section, { BasicFields as Fields } from './Section';
import ServiceList from '../ServiceItem/List';
import styles from './index.less';

const ListItem = ({ form, invoiceId, treatmentId, incidentId, invoiceNo }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const onDelete = () => {
    dispatch({
      type: `${NAMESPACE}/removeInvoiceItem`,
      payload: {
        treatmentId,
        invoiceId,
      },
    });
  };
  return (
    <div className={styles.invoiceItem}>
      <div className={styles.header}>
        <div className={styles.number}>{invoiceNo}</div>
      </div>
      <Row type="flex" gutter={16}>
        <Col span={5}>
          <Section form={form} editable={editable} section="Invoice.Basic">
            <Fields.ExchangeDate />
            <Fields.Expense invoiceId={invoiceId} />
            <Fields.InvoiceDate incidentId={incidentId} treatmentId={treatmentId} />
            <Fields.InvoiceNo />
            <Fields.IsClaimWithOtherInsurer />
            <Fields.OtherInsurerPaidAmount />
          </Section>
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
          <ServiceList invoiceId={invoiceId} incidentId={incidentId} treatmentId={treatmentId} />
        </Col>
      </Row>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { invoiceId }: any) => ({
  invoiceItem: modelnamepsace.claimEntities.invoiceListMap[invoiceId],
}))(
  Form.create({
    onFieldsChange(props: any, changedFields) {
      const { dispatch, incidentId, treatmentId, invoiceId } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveInvoiceItem',
          payload: {
            changedFields,
            incidentId,
            treatmentId,
            invoiceId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { invoiceItem } = props;
      return formUtils.mapObjectToFields(invoiceItem);
    },
  })(ListItem)
);
