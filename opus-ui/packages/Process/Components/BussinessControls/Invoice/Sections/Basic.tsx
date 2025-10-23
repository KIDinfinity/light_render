import React from 'react';

import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Invoice, { FieldsBasic as Fields } from 'process/Components/BussinessControls/Invoice';

const ListItem = (props: any) => {
  const defaultProps = {
    ...props,
    register: false,
  };
  return (
    <Invoice.Section {...defaultProps} section="Invoice">
      <Fields.ExchangeDate />
      <Fields.Expense />
      <Fields.InvoiceDate incidentId={props.incidentId} treatmentId={props.treatmentId} />
      <Fields.InvoiceNo />
      <Fields.IsClaimWithOtherInsurer />
      <Fields.OtherInsurerPaidAmount />
    </Invoice.Section>
  );
};

export default connect((state: any, { NAMESPACE, invoiceId }: any) => ({
  validating: state?.formCommonController.validating,
  invoiceItem: state?.[NAMESPACE]?.claimEntities?.invoiceListMap?.[invoiceId],
}))(
  Form.create({
    onFieldsChange(props: any, changedFields) {
      const { NAMESPACE, dispatch, incidentId, treatmentId, invoiceId, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveInvoiceItem',
              payload: {
                changedFields,
                incidentId,
                treatmentId,
                invoiceId,
              },
            });
          }, 0);
        } else {
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
      }
    },
    mapPropsToFields(props: any) {
      const { invoiceItem } = props;
      return formUtils.mapObjectToFields(invoiceItem);
    },
  })(ListItem)
);
