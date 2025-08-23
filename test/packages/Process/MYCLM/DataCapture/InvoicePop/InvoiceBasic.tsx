import React, { useEffect } from 'react';
import { NAMESPACE } from '../activity.config';

import { Form, Row, Col } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';
import Section, { BasicFields as Fields } from './Section';
import ServiceItemList from './Service/ServiceItemList';
import styles from './style.less';

const InvoiceBasic = ({
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
      type: `${NAMESPACE}/savePopUpInvoiceItem`,
      payload: {
        changedFields: { invoiceCurrency: selectCurrency.currencyCode },
        invoiceId,
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
          <ServiceItemList
            invoiceId={invoiceId}
            serviceItemList={serviceItemList}
            incidentId={incidentId}
            serviceAddItem={serviceAddItem}
          />
        </Col>
      </Row>
    </div>
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
      const { invoiceBasicItem } = props;
      return formUtils.mapObjectToFields(invoiceBasicItem);
    },
  })(InvoiceBasic)
);
