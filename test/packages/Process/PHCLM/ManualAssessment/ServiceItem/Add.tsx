import React, { useEffect } from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector, connect } from 'dva';
import { Form, Row, Col } from 'antd';
import classNames from 'classnames';
import { FormBorderCard, formUtils } from 'basic/components/Form';
import Section, { AddFields } from './Section';
import styles from './ServiceList.less';

const Add = ({ form, invoiceId, serviceItemId, incidentItem, incidentId, treatmentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <div className={styles.serviceItem}>
      <Row type="flex" gutter={0}>
        <Col span={10} className={classNames(styles.left, styles.lastServerList)}>
          <FormBorderCard>
            <div className={styles.main} id={serviceItemId}>
              <Section form={form} editable={editable} section="Service">
                <AddFields.ServiceItem
                  invoiceId={invoiceId}
                  incidentId={incidentId}
                  treatmentId={treatmentId}
                  claimTypeList={formUtils.queryValue(incidentItem?.claimTypeArray) || []}
                />
              </Section>
            </div>
          </FormBorderCard>
        </Col>
        <Col span={14} className={styles.right} />
      </Row>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { incidentId }: any) => ({
  claimNo: modelnamepsace.claimProcessData?.claimNo,
  incidentItem: modelnamepsace.claimEntities.incidentListMap[incidentId] || {},
}))(
  Form.create({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, invoiceId } = props;

      dispatch({
        type: `${NAMESPACE}/addServiceItem`,
        payload: {
          invoiceId,
          changedValues
        },
      });
    },
  })(Add)
);
