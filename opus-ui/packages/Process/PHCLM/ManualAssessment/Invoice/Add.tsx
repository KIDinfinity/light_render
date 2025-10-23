import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector, connect } from 'dva';
import { Form, Row, Col } from 'antd';
import { FormBorderCard, formUtils } from 'basic/components/Form';
import { v4 as uuidv4 } from 'uuid';
import Section, { AddFields } from './Section';
import styles from './InvoiceList.less';

const Add = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <div className={styles.invoiceItem}>
      <Row className={styles.container}>
        <Col span={10} className={styles.left}>
          <FormBorderCard>
            <Section form={form} editable={editable} section="Invoice">
              <AddFields.InvoiceDate />
            </Section>
          </FormBorderCard>
        </Col>
        <Col span={14} className={styles.lastRight}>
          <></>
        </Col>
      </Row>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  claimNo: modelnamepsace.claimProcessData.claimNo || '',
}))(
  Form.create<any>({
    onValuesChange(props, changedFields) {
      const { dispatch, treatmentId, claimNo } = props;

      const invoiceId = uuidv4();
      dispatch({
        type: `${NAMESPACE}/addInvoiceItem`,
        payload: {
          treatmentId,
          changedFields,
          invoiceId,
        },
      });

      dispatch({
        type: `${NAMESPACE}/addServiceItem`,
        payload: {
          invoiceId,
          claimNo,
          changedValues: {
            // TODO:这个不应该hardcode
            serviceItem: 'Dummy',
          },
        },
      });
    },

    mapPropsToFields(props) {
      const { data } = props;
      return formUtils.mapObjectToFields({ ...data, invoiceDate: '' });
    },
  })(Add)
);
