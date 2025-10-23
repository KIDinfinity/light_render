import React from 'react';
import { NAMESPACE } from '../../activity.config';

import { Form, Row, Col } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Section, { HeaderFields as Fields } from '../Section';
import styles from '../style.less';
import TitleLabel from '../TitleLabel';

const InvoiceAddTitle = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <>
      <div className={styles.invoiceTitle}>
        <Row type="flex" gutter={16}>
          <Col span={6}>
            <TitleLabel
              label={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.treatment-no',
              })}
            />
            <div className={styles.titleStyle}>
              <Section
                form={form}
                editable={editable}
                section="InvoicePopUp.Header"
                register={false}
              >
                <Fields.TreatmentNo />
              </Section>
            </div>
          </Col>
          <Col span={6}>
            <TitleLabel
              label={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.hospitalDetail.table-column.invoice-no',
              })}
            />
            <div className={styles.titleStyle}>
              <Section
                form={form}
                editable={editable}
                section="InvoicePopUp.Header"
                register={false}
              >
                <Fields.InvoiceNo />
              </Section>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'savePopUpAddInvoiceItem',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'savePopUpAddInvoiceItem',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { invoiceTitle } = props;
      return formUtils.mapObjectToFields(invoiceTitle);
    },
  })(InvoiceAddTitle)
);
