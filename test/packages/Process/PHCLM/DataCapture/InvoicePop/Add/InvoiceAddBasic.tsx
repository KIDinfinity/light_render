import React, { useEffect } from 'react';
import { NAMESPACE } from '../../activity.config';

import { connect, useSelector, useDispatch } from 'dva';
import { Form, Col, Row } from 'antd';
import { formUtils } from 'basic/components/Form';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';
import Section, { BasicFields as Fields } from '../Section';
import ServiceAddItemList from './ServiceAddItemList';
import styles from '../style.less';

const InvoiceAddSection = ({
  form,
  invoiceId,
  serviceItemList,
  serviceAddItem,
  invoiceBasicItem,
  incidentId,
}: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const dispatch = useDispatch();

  const changeInvoiceCurrency = (selectCurrency: any) => {
    dispatch({
      type: `${NAMESPACE}/savePopUpAddInvoiceItem`,
      payload: {
        changedFields: { invoiceCurrency: selectCurrency.currencyCode },
      },
    });
  };
  useEffect(() => {
    const DomNode = document.getElementById(invoiceId);
    scrollIntoView(DomNode, {
      scrollMode: 'if-needed',
      block: 'center',
      inline: 'center',
    }).then(() => {});
  }, [formUtils.queryValue(invoiceBasicItem.invoiceDate)]);

  return (
    <div className={styles.invoiceSection} id={invoiceId}>
      <Row type="flex" gutter={16}>
        <Col span={6}>
          <Section form={form} editable={editable} section="InvoicePopUp.Basic" register={false}>
            <Fields.InvoiceDate />
            <Fields.Expense
              invoiceCurrency={invoiceBasicItem?.invoiceCurrency}
              changeInvoiceCurrency={changeInvoiceCurrency}
            />
            <Fields.IsClaimWithOtherInsurer />
            <Fields.OtherInsurerPaidAmount />
          </Section>
        </Col>
        <Col span={18}>
          <ServiceAddItemList
            invoiceId={invoiceId}
            serviceItemList={serviceItemList}
            serviceAddItem={serviceAddItem}
            incidentId={incidentId}
          />
        </Col>
      </Row>
    </div>
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
      const { invoiceBasicItem } = props;
      return formUtils.mapObjectToFields(invoiceBasicItem);
    },
  })(InvoiceAddSection)
);
