import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form, Button, Row, Col } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useDispatch, useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Section, { HeaderFields as Fields } from './Section';
import styles from './style.less';
import TitleLabel from './TitleLabel';

const InvoiceTitle = ({ form, invoiceId }: any) => {
  const dispatch = useDispatch();
  const removePopUpInvoice = () => {
    dispatch({
      type: `${NAMESPACE}/removePopUpInvoice`,
      payload: {
        invoiceId,
      },
    });
  };
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
          <Col span={12}>
            <div className={styles.operator}>
              {editable && (
                <Button onClick={removePopUpInvoice} className={styles.button}>
                  {formatMessageApi({
                    Label_BPM_Button: 'app.navigator.task-detail-of-data-capture.button.delete',
                  })}
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, invoiceId } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'savePopUpInvoiceItem',
          payload: {
            changedFields,
            invoiceId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { invoiceTitle } = props;
      return formUtils.mapObjectToFields(invoiceTitle);
    },
  })(InvoiceTitle)
);
