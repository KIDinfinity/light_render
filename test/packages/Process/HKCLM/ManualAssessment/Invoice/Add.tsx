import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector, connect } from 'dva';
import { Form, Row, Col } from 'antd';
import { FormBorderCard, formUtils } from 'basic/components/Form';
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

export default connect()(
  Form.create<any>({
    onValuesChange(props, changedFields) {
      const { dispatch, treatmentId } = props;
      dispatch({
        type: `${NAMESPACE}/addInvoiceItem`,
        payload: {
          treatmentId,
          changedFields,
        },
      });
    },

    mapPropsToFields(props) {
      const { data } = props;
      return formUtils.mapObjectToFields({ ...data, invoiceDate: '' });
    },
  })(Add)
);
