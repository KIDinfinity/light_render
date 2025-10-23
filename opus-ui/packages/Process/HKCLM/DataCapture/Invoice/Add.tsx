import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector, connect } from 'dva';
import { Form, Row, Col } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { HeaderFields as Fields } from './Section';
import styles from './index.less';

const Add = ({ incidentId, form, invoiceNo }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <div className={styles.invoiceItem}>
      <div className={styles.header}>
        <div className={styles.number}>{invoiceNo}</div>
      </div>
      <Row type="flex" gutter={16} style={{ flex: 1 }}>
        <Col span={5}>
          <Section form={form} editable={editable} section="Invoice.Header" register={false}>
            <Fields.InvoiceDate incidentId={incidentId} />
          </Section>
        </Col>
      </Row>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { treatmentId }: any) => ({
  invoiceList: modelnamepsace.claimEntities.treatmentListMap[treatmentId].invoiceList,
}))(
  Form.create<any>({
    onValuesChange(props, changedFields) {
      const { dispatch, incidentId, treatmentId } = props;

      dispatch({
        type: `${NAMESPACE}/addInvoiceItem`,
        payload: {
          incidentId,
          treatmentId,
          changedFields,
        },
      });
    },
    mapPropsToFields() {
      return formUtils.mapObjectToFields({});
    },
  })(Add)
);
