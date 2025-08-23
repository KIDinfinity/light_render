import React from 'react';
import { Form } from 'antd';
import { FormBorderCard, formUtils } from 'basic/components/Form';
import Invoice, { FieldsHeader as Fields } from 'process/Components/BussinessControls/Invoice';

const Add = (props: any) => {
  const defaultProps = {
    ...props,
    register: false,
  };

  return (
    <FormBorderCard>
      <Invoice.Section {...defaultProps} section="Add.Invoice">
        <Fields.InvoiceDate incidentId={props?.incidentId} />
      </Invoice.Section>
    </FormBorderCard>
  );
};

export default Form.create<any>({
  onValuesChange(props, changedFields) {
    const { NAMESPACE, incidentId, dispatch, treatmentId } = props;

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
})(Add);
